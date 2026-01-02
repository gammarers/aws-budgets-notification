import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.189.1',
  typescriptVersion: '5.9.x',
  jsiiVersion: '5.9.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-budgets-notification-stack',
  description: 'AWS Budgets Notification',
  keywords: ['aws', 'cdk', 'aws-cdk', 'budgets', 'notification', 'slack', 'sns'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-budgets-notification-stack.git',
  releaseToNpm: false,
  npmAccess: javascript.NpmAccess.PUBLIC,
  majorVersion: 2,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '24.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 19 * * 3']), // every wednesday 19:00 (JST/THU:0400)
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
  // publishToPypi: {
  //   distName: 'gammarers.aws-budgets-notification-stack',
  //   module: 'gammarers.aws_budgets_notification_stack',
  // },
  // publishToNuget: {
  //   dotNetNamespace: 'Gammarers.CDK.AWS',
  //   packageId: 'Gammarers.CDK.AWS.BudgetNotificationStack',
  // },
});
project.synth();