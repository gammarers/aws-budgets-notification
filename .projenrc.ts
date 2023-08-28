import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.80.0',
  typescriptVersion: '4.9.x',
  jsiiVersion: '~5.0.0',
  defaultReleaseBranch: 'main',
  name: '@gammarer/aws-budgets-notification',
  description: 'AWS Budgets Notification',
  keywords: ['aws', 'cdk', 'aws-cdk', 'budgets', 'notification', 'slack', 'sns'],
  projenrcTs: true,
  repositoryUrl: 'https://github.com/yicr/aws-budgets-notification.git',
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '18.17.1',
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
  publishToPypi: {
    distName: 'gammarer.aws-budgets-notification',
    module: 'gammarer.aws_budgets_notification',
  },
  publishToMaven: {
    mavenGroupId: 'com.gammarer',
    javaPackage: 'com.gammarer.cdk.aws.budgets_notification',
    mavenArtifactId: 'aws-budgets-notification',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },
});
project.synth();