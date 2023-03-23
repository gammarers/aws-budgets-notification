import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.42.0',
  defaultReleaseBranch: 'main',
  name: '@yicr/aws-budgets-notification',
  description: 'AWS Budgets Notification',
  keywords: ['aws', 'cdk', 'aws-cdk', 'budgets', 'notification'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yicr/aws-budgets-notification.git',
  minNodeVersion: '16.0.0',
  workflowNodeVersion: '16.19.1',
});
project.synth();