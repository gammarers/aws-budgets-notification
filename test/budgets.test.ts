import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { BudgetsNotification } from '../src';


describe('BudgetsNotification Testing', () => {

  describe('BudgetsNotification Normal Testing', () => {
    const app = new App();
    const stack = new Stack(app, 'TestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    new BudgetsNotification(stack, 'BudgetsNotification', {
      slackWorkspaceId: 'T0XXXX111',
      slackChannelId: 'XXXXXXXX',
      budgetLimitAmount: 50,
    });
    const template = Template.fromStack(stack);
    describe('SNS Topic Testing', () => {
      it('Should have sns topic', () => {
        template.hasResourceProperties('AWS::SNS::Topic', Match.objectEquals({
          DisplayName: Match.stringLikeRegexp('budget-notification-.*-topic'),
          TopicName: Match.stringLikeRegexp('budget-notification-.*-topic'),
        }));
      });
      it('Should have sns topic resource policy of publish from aws budgets', () => {
        template.hasResourceProperties('AWS::SNS::TopicPolicy', {
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: Match.arrayWith([
              Match.objectEquals({
                Sid: 'AWSBudgetsSNSPublishingPermissions',
                Effect: 'Allow',
                Action: 'sns:Publish',
                Principal: {
                  Service: 'budgets.amazonaws.com',
                },
                Resource: {
                  Ref: Match.stringLikeRegexp('BudgetsNotificationNotificationTopic.*'),
                },
              }),
            ]),
          },
        });
      });
      it('Should have sns topic resource policy of sns actions from owner', () => {
        template.hasResourceProperties('AWS::SNS::TopicPolicy', {
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: Match.arrayWith([
              Match.objectEquals({
                Sid: 'OwnerSNSActionPermissions',
                Effect: 'Allow',
                Action: [
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
                Principal: {
                  AWS: '*',
                },
                Resource: {
                  Ref: Match.stringLikeRegexp('BudgetsNotificationNotificationTopic.*'),
                },
                Condition: {
                  StringEquals: {
                    'AWS:SourceOwner': '123456789012',
                  },
                },
              }),
            ]),
          },
        });
      });
    });

    describe('ChatBot SlackChannelConfiguration Testing', () => {
      it('Should have SlackChannelConfiguration role', () => {
        template.hasResourceProperties('AWS::IAM::Role', Match.objectEquals({
          RoleName: Match.stringLikeRegexp('slack-channel-budget-notification-.*-config-role'),
          Description: Match.anyValue(),
          AssumeRolePolicyDocument: Match.objectEquals({
            Version: '2012-10-17',
            Statement: Match.arrayWith([
              Match.objectEquals({
                Effect: 'Allow',
                Principal: {
                  Service: 'chatbot.amazonaws.com',
                },
                Action: 'sts:AssumeRole',
              }),
            ]),
          }),
          Policies: Match.arrayEquals([
            {
              PolicyName: 'chatbot-policy',
              PolicyDocument: Match.objectEquals({
                Version: '2012-10-17',
                Statement: [
                  Match.objectEquals({
                    Effect: 'Allow',
                    Action: [
                      'cloudwatch:Describe*',
                      'cloudwatch:Get*',
                      'cloudwatch:List*',
                    ],
                    Resource: '*',
                  }),
                ],
              }),
            },
          ]),
        }));
      });
      it('Should have SlackChannelConfiguration', () => {
        template.hasResourceProperties('AWS::Chatbot::SlackChannelConfiguration', Match.objectEquals({
          ConfigurationName: Match.stringLikeRegexp('slack-channel-budget-notification-.*-config'),
          IamRoleArn: {
            'Fn::GetAtt': Match.arrayEquals([
              Match.stringLikeRegexp('BudgetsNotificationSlackChannelConfigRole.*'),
              'Arn',
            ]),
          },
          LoggingLevel: 'ERROR',
          SlackWorkspaceId: 'T0XXXX111',
          SlackChannelId: 'XXXXXXXX',
          SnsTopicArns: [
            {
              Ref: Match.stringLikeRegexp('BudgetsNotificationNotificationTopic.*'),
            },
          ],
          //UserRoleRequired: ,
        }));
      });
    });
    describe('Budget Testing', () => {
      it('Should have Budget', () => {
        template.hasResourceProperties('AWS::Budgets::Budget', Match.objectEquals({
          Budget: {
            BudgetName: 'Monthly usage',
            BudgetType: 'COST',
            TimeUnit: 'MONTHLY',
            BudgetLimit: {
              Amount: 50,
              Unit: 'USD',
            },
          },
          NotificationsWithSubscribers: Match.arrayWith([
            Match.objectEquals({
              Notification: Match.objectEquals({
                ComparisonOperator: 'GREATER_THAN',
                NotificationType: 'ACTUAL',
                Threshold: 60,
                ThresholdType: 'PERCENTAGE',
              }),
              Subscribers: Match.arrayWith([
                Match.objectEquals({
                  Address: {
                    Ref: Match.stringLikeRegexp('BudgetsNotificationNotificationTopic.*'),
                  },
                  SubscriptionType: 'SNS',
                }),
              ]),
            }),
            Match.objectEquals({
              Notification: Match.objectEquals({
                ComparisonOperator: 'GREATER_THAN',
                NotificationType: 'ACTUAL',
                Threshold: 80,
                ThresholdType: 'PERCENTAGE',
              }),
              Subscribers: Match.arrayWith([
                Match.objectEquals({
                  Address: {
                    Ref: Match.stringLikeRegexp('BudgetsNotificationNotificationTopic.*'),
                  },
                  SubscriptionType: 'SNS',
                }),
              ]),
            }),
            Match.objectEquals({
              Notification: Match.objectEquals({
                ComparisonOperator: 'GREATER_THAN',
                NotificationType: 'ACTUAL',
                Threshold: 100,
                ThresholdType: 'PERCENTAGE',
              }),
              Subscribers: Match.arrayWith([
                Match.objectEquals({
                  Address: {
                    Ref: Match.stringLikeRegexp('BudgetsNotificationNotificationTopic.*'),
                  },
                  SubscriptionType: 'SNS',
                }),
              ]),
            }),
          ]),
        }));
      });
    });
    it('Should match snapshot', () => {
      expect(template.toJSON()).toMatchSnapshot('budgets-normal');
    });
  });

  describe('BudgetsNotification LinkedAccounts Testing', () => {
    const app = new App();
    const stack = new Stack(app, 'TestingStack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
    new BudgetsNotification(stack, 'BudgetsNotification', {
      slackWorkspaceId: 'T0XXXX111',
      slackChannelId: 'XXXXXXXX',
      budgetLimitAmount: 50,
      linkedAccounts: [
        '111111111111',
        '222222222222',
      ],
    });
    const template = Template.fromStack(stack);

    it('Should match budgets resource count', () => {
      template.resourceCountIs('AWS::Budgets::Budget', 2);
    });

    it('Should match snapshot', () => {
      expect(template.toJSON()).toMatchSnapshot('budgets-linked-accounts');
    });
  });
});
