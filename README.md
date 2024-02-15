# AWS Budgets Notification

[![GitHub](https://img.shields.io/github/license/gammarer/aws-budgets-notification?style=flat-square)](https://github.com/gammarer/aws-budgets-notification/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@gammarer/aws-budgets-notification?style=flat-square)](https://www.npmjs.com/package/@gammarer/aws-budgets-notification)
[![PyPI](https://img.shields.io/pypi/v/gammarer.aws-budgets-notification?style=flat-square)](https://pypi.org/project/gammarer.aws-budgets-notification/)
[![Nuget](https://img.shields.io/nuget/v/Gammarer.CDK.AWS.BudgetNotification?style=flat-square)](https://www.nuget.org/packages/Gammarer.CDK.AWS.BudgetNotification/)
[![Sonatype Nexus (Releases)](https://img.shields.io/nexus/r/com.gammarer/aws-budgets-notification?server=https%3A%2F%2Fs01.oss.sonatype.org%2F&style=flat-square)](https://s01.oss.sonatype.org/content/repositories/releases/com/gammarer/aws-budgets-notification/)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/gammarer/aws-budgets-notification/release.yml?branch=main&label=release&style=flat-square)](https://github.com/gammarer/aws-budgets-notification/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/gammarer/aws-budgets-notification?sort=semver&style=flat-square)](https://github.com/gammarer/aws-budgets-notification/releases)

[![View on Construct Hub](https://constructs.dev/badge?package=@gammarer/aws-budgets-notification)](https://constructs.dev/packages/@gammarer/aws-budgets-notification)

A construct library for creating AWS Budgets Notification to Slack with the AWS CDK.

## Resources

This construct creating resource list.

- SNS Topic
- ChatBot SlackChannelConfiguration
- Budgets (linked account count or self)

## Install

### TypeScript

```shell
npm install @gammarer/aws-budgets-notification
# or
yarn add @gammarer/aws-budgets-notification
```

### Python

```shell
pip install gammarer.aws-budgets-notification
```

### C# / .NET

```shell
dotnet add package Gammarer.CDK.AWS.BudgetNotification
```

### Java

Add the following to pom.xml:

```xml
<dependency>
  <groupId>com.gammarer</groupId>
  <artifactId>aws-budgets-notification</artifactId>
</dependency>
```

## Example

```typescript
import { BudgetsNotification } from '@gammarer/aws-budgets-notification';

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
