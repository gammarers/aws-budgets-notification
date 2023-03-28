import * as crypto from 'crypto';
import * as cdk from 'aws-cdk-lib';
import * as budgets from 'aws-cdk-lib/aws-budgets';
import * as bot from 'aws-cdk-lib/aws-chatbot';
import * as iam from 'aws-cdk-lib/aws-iam';
//import * as logs from 'aws-cdk-lib/aws-logs';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';


export interface BudgetsNotificationProps {
  readonly slackWorkspaceId: string;
  readonly slackChannelId: string;
  readonly budgetLimitAmount: number;
  readonly linkedAccounts?: string[];
}

export class BudgetsNotification extends Construct {

  constructor(scope: Construct, id: string, props: BudgetsNotificationProps) {
    super(scope, id);

    // 👇Get current account & region
    const account = cdk.Stack.of(this).account;
    // const region = cdk.Stack.of(this).region;

    // 👇Create random key
    const randomNameKey = crypto.createHash('shake256', { outputLength: 4 })
      .update(`${cdk.Names.uniqueId(scope)}-${cdk.Names.uniqueId(this)}`)
      .digest('hex');

    // 👇Create SNS Topic
    const topic = new sns.Topic(this, 'NotificationTopic', {
      topicName: `budget-notification-${randomNameKey}-topic`,
      displayName: `budget-notification-${randomNameKey}-topic`,
    });
    topic.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'AWSBudgetsSNSPublishingPermissions',
      effect: iam.Effect.ALLOW,
      principals: [
        new iam.ServicePrincipal('budgets.amazonaws.com'),
      ],
      actions: [
        'sns:Publish',
      ],
      resources: [
        topic.topicArn,
      ],
    }));
    topic.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'OwnerSNSActionPermissions',
      effect: iam.Effect.ALLOW,
      principals: [
        new iam.AnyPrincipal(),
      ],
      actions: [
        'sns:GetTopicAttributes',
        'sns:SetTopicAttributes',
        'sns:AddPermission',
        'sns:RemovePermission',
        'sns:DeleteTopic',
        'sns:Subscribe',
        'sns:ListSubscriptionsByTopic',
        'sns:Publish',
        'sns:Receive',
      ],
      resources: [
        topic.topicArn,
      ],
      conditions: {
        StringEquals: {
          'AWS:SourceOwner': account,
        },
      },
    }));

    // 👇Create ChatBot
    new bot.SlackChannelConfiguration(this, 'SlackChannelConfig', {
      slackChannelConfigurationName: `slack-channel-budget-notification-${randomNameKey}-config`,
      slackWorkspaceId: props.slackWorkspaceId,
      slackChannelId: props.slackChannelId,
      //logRetention: logs.RetentionDays.TWO_MONTHS,
      //logRetentionRetryOptions: undefined,
      //logRetentionRole: undefined,
      loggingLevel: bot.LoggingLevel.ERROR,
      notificationTopics: [
        topic,
      ],
      role: new iam.Role(this, 'SlackChannelConfigRole', {
        roleName: `slack-channel-budget-notification-${randomNameKey}-config-role`,
        description: 'slack channel budget notification config role.',
        assumedBy: new iam.ServicePrincipal('chatbot.amazonaws.com'),
        inlinePolicies: {
          'chatbot-policy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  'cloudwatch:Describe*',
                  'cloudwatch:Get*',
                  'cloudwatch:List*',
                ],
                resources: ['*'],
              }),
            ],
          }),
        },
      }),
    });

    // 👇Common notification with subscribers.
    const notificationsWithSubscribers: Array<budgets.CfnBudget.NotificationWithSubscribersProperty> = [
      {
        notification: {
          notificationType: 'ACTUAL',
          comparisonOperator: 'GREATER_THAN',
          threshold: 60,
          thresholdType: 'PERCENTAGE',
        },
        subscribers: [
          {
            subscriptionType: 'SNS',
            address: topic.topicArn,
          },
        ],
      },
      {
        notification: {
          notificationType: 'ACTUAL',
          comparisonOperator: 'GREATER_THAN',
          threshold: 80,
          thresholdType: 'PERCENTAGE',
        },
        subscribers: [
          {
            subscriptionType: 'SNS',
            address: topic.topicArn,
          },
        ],
      },
      {
        notification: {
          notificationType: 'ACTUAL',
          comparisonOperator: 'GREATER_THAN',
          threshold: 100,
          thresholdType: 'PERCENTAGE',
        },
        subscribers: [
          {
            subscriptionType: 'SNS',
            address: topic.topicArn,
          },
        ],
      },
    ];

    if (props.linkedAccounts && props.linkedAccounts.length >= 1) {
      for (const linkedAccount of props.linkedAccounts) {
        new budgets.CfnBudget(this, `Budget${linkedAccount}`, {
          budget: {
            budgetType: 'COST',
            budgetName: `Monthly usage for ${linkedAccount}.`,
            timeUnit: 'MONTHLY',
            costFilters: {
              LinkedAccount: [
                linkedAccount,
              ],
            },
            budgetLimit: {
              amount: props.budgetLimitAmount,
              unit: 'USD',
            },
          },
          notificationsWithSubscribers,
        });
      }
    } else {
      new budgets.CfnBudget(this, 'Budget', {
        budget: {
          budgetType: 'COST',
          budgetName: 'Monthly usage',
          timeUnit: 'MONTHLY',
          budgetLimit: {
            amount: props.budgetLimitAmount,
            unit: 'USD',
          },
        },
        notificationsWithSubscribers,
      });
    }
  }
}