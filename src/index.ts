import { Stack, StackProps } from 'aws-cdk-lib';
import * as budgets from 'aws-cdk-lib/aws-budgets';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';

export interface BudgetsNotificationStackProps extends StackProps {
  // readonly slackWorkspaceId: string;
  // readonly slackChannelId: string;
  readonly amount: number;
  // readonly linkedAccounts?: string[];
}

export class BudgetsNotificationStack extends Stack {

  constructor(scope: Construct, id: string, props: BudgetsNotificationStackProps) {
    super(scope, id);

    // 👇 Get current account & region
    // const account = Stack.of(this).account;
    // const region = Stack.of(this).region;

    // 👇 SNS Topic for budgets notifications(no subscriptions)
    const sinkTopic = new sns.Topic(this, 'BudgetsSinkTopic', {
      displayName: 'Budgets notification sink (no subscriptions)',
    });

    sinkTopic.grantPublish(new iam.ServicePrincipal('budgets.amazonaws.com'));

    // 👇 Common notification with subscribers.
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
            address: sinkTopic.topicArn,
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
            address: sinkTopic.topicArn,
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
            address: sinkTopic.topicArn,
          },
        ],
      },
    ];

    new budgets.CfnBudget(this, 'Budget', {
      budget: {
        budgetType: 'COST',
        budgetName: 'Monthly usage',
        timeUnit: 'MONTHLY',
        budgetLimit: {
          amount: props.amount,
          unit: 'USD',
        },
      },
      notificationsWithSubscribers,
    });

    // if (props.linkedAccounts && props.linkedAccounts.length >= 1) {
    //   for (const linkedAccount of props.linkedAccounts) {
    //     new budgets.CfnBudget(this, `Budget${linkedAccount}`, {
    //       budget: {
    //         budgetType: 'COST',
    //         budgetName: `Monthly usage for ${linkedAccount}.`,
    //         timeUnit: 'MONTHLY',
    //         costFilters: {
    //           LinkedAccount: [
    //             linkedAccount,
    //           ],
    //         },
    //         budgetLimit: {
    //           amount: props.budgetLimitAmount,
    //           unit: 'USD',
    //         },
    //       },
    //       notificationsWithSubscribers,
    //     });
    //   }
    // } else {}

    const pass = new sfn.Pass(this, 'Pass');

    const success = new sfn.Succeed(this, 'Success');

    const machine = new sfn.StateMachine(this, 'BudgetAlertNotificationStateMachine', {
      definition: pass.next(success),
    });

    new events.Rule(this, 'BudgetThresholdExceededRule', {
      description: 'Trigger Step Functions when AWS Budgets threshold is exceeded',
      eventPattern: {
        source: ['aws.budgets'],
        detailType: ['Budget Threshold Exceeded'],
        // detail: { budgetName: ['my-budget'] },
      },
      targets: [
        new targets.SfnStateMachine(machine, {
          input: events.RuleTargetInput.fromEventPath('$'),
          // executionName: events.EventField.fromPath('$.id'),
        }),
      ],
    });
  }
}