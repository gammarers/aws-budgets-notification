# AWS Budgets Notification

[![source](https://img.shields.io/badge/source-github-blue?logo=github)](https://github.com/yicr/aws-budgets-notification)
[![npm release](https://img.shields.io/npm/v/@yicr/aws-budgets-notification?label=npm)](https://www.npmjs.com/package/@gammarer/aws-budgets-notification)
![cdk peer dependency version](https://img.shields.io/npm/dependency-version/@gammarer/aws-budgets-notification/peer/aws-cdk-lib?label=cdk)
![npm downloads](https://img.shields.io/npm/dt/@gammarer/aws-budgets-notification)

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
```
or
```shell
yarn add @gammarer/aws-budgets-notification
```

## Example

```shell
npm install @gammarer/aws-budgets-notification
```

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
