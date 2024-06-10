# AWS Budgets Notification

[![GitHub](https://img.shields.io/github/license/gammarers/aws-budgets-notification?style=flat-square)](https://github.com/gammarers/aws-budgets-notification/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@gammarers/aws-budgets-notification?style=flat-square)](https://www.npmjs.com/package/@gammarers/aws-budgets-notification)
[![PyPI](https://img.shields.io/pypi/v/gammarers.aws-budgets-notification?style=flat-square)](https://pypi.org/project/gammarers.aws-budgets-notification/)
[![Nuget](https://img.shields.io/nuget/v/gammarers.CDK.AWS.BudgetNotification?style=flat-square)](https://www.nuget.org/packages/Gammarers.CDK.AWS.BudgetNotification/)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/gammarers/aws-budgets-notification/release.yml?branch=main&label=release&style=flat-square)](https://github.com/gammarers/aws-budgets-notification/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/gammarers/aws-budgets-notification?sort=semver&style=flat-square)](https://github.com/gammarers/aws-budgets-notification/releases)

[![View on Construct Hub](https://constructs.dev/badge?package=@gammarers/aws-budgets-notification)](https://constructs.dev/packages/@gammarers/aws-budgets-notification)

A construct library for creating AWS Budgets Notification to Slack with the AWS CDK.

## Resources

This construct creating resource list.

- SNS Topic
- ChatBot SlackChannelConfiguration
- Budgets (linked account count or self)

## Install

### TypeScript

```shell
npm install @gammarers/aws-budgets-notification
# or
yarn add @gammarers/aws-budgets-notification
```

### Python

```shell
pip install gammarers.aws-budgets-notification
```

### C# / .NET

```shell
dotnet add package Gammarers.CDK.AWS.BudgetNotification
```

## Example

```typescript
import { BudgetsNotification } from '@gammarers/aws-budgets-notification';

new BudgetsNotification(stack, 'BudgetsNotification', {
  slackWorkspaceId: 'T0XXXX111', // already AWS account linked your Slack.
  slackChannelId: 'XXXXXXXX', // already created your slack channel.
  budgetLimitAmount: 50,
  // optional linked account list
  linkedAccounts: [
    '111111111111',
    '222222222222',
  ],
});

```

![example notification](./docs/slack-notification-image.png)


## License

This project is licensed under the Apache-2.0 License.
