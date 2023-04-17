# AWS Budgets Notification

[![source](https://img.shields.io/badge/source-github-blue?logo=github)](https://github.com/yicr/aws-budgets-notification)
[![npm release](https://img.shields.io/npm/v/@yicr/aws-budgets-notification?label=npm)](https://www.npmjs.com/package/@yicr/aws-budgets-notification)
![cdk peer dependency version](https://img.shields.io/npm/dependency-version/@yicr/aws-budgets-notification/peer/aws-cdk-lib?label=cdk)
![npm downloads](https://img.shields.io/npm/dt/@yicr/aws-budgets-notification)

A construct library for creating AWS Budgets Notification to Slack with the AWS CDK.


## Resources

This construct creating resource list.

- SNS Topic
- ChatBot SlackChannelConfiguration
- Budgets (linked account count or self)

## Install

### TypeScript

```shell
npm install @yicr/aws-budgets-notification
```
or
```shell
yarn add @yicr/aws-budgets-notification
```

## Example

```shell
npm install @yicr/aws-budgets-notification
```

```typescript
import { BudgetsNotification } from '@yicr/aws-budgets-notification';

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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BudgetsNotification <a name="BudgetsNotification" id="@yicr/aws-budgets-notification.BudgetsNotification"></a>

#### Initializers <a name="Initializers" id="@yicr/aws-budgets-notification.BudgetsNotification.Initializer"></a>

```typescript
import { BudgetsNotification } from '@yicr/aws-budgets-notification'

new BudgetsNotification(scope: Construct, id: string, props: BudgetsNotificationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotification.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotification.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotification.Initializer.parameter.props">props</a></code> | <code><a href="#@yicr/aws-budgets-notification.BudgetsNotificationProps">BudgetsNotificationProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@yicr/aws-budgets-notification.BudgetsNotification.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@yicr/aws-budgets-notification.BudgetsNotification.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@yicr/aws-budgets-notification.BudgetsNotification.Initializer.parameter.props"></a>

- *Type:* <a href="#@yicr/aws-budgets-notification.BudgetsNotificationProps">BudgetsNotificationProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotification.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@yicr/aws-budgets-notification.BudgetsNotification.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotification.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@yicr/aws-budgets-notification.BudgetsNotification.isConstruct"></a>

```typescript
import { BudgetsNotification } from '@yicr/aws-budgets-notification'

BudgetsNotification.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@yicr/aws-budgets-notification.BudgetsNotification.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotification.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@yicr/aws-budgets-notification.BudgetsNotification.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### BudgetsNotificationProps <a name="BudgetsNotificationProps" id="@yicr/aws-budgets-notification.BudgetsNotificationProps"></a>

#### Initializer <a name="Initializer" id="@yicr/aws-budgets-notification.BudgetsNotificationProps.Initializer"></a>

```typescript
import { BudgetsNotificationProps } from '@yicr/aws-budgets-notification'

const budgetsNotificationProps: BudgetsNotificationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotificationProps.property.budgetLimitAmount">budgetLimitAmount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotificationProps.property.slackChannelId">slackChannelId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotificationProps.property.slackWorkspaceId">slackWorkspaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@yicr/aws-budgets-notification.BudgetsNotificationProps.property.linkedAccounts">linkedAccounts</a></code> | <code>string[]</code> | *No description.* |

---

##### `budgetLimitAmount`<sup>Required</sup> <a name="budgetLimitAmount" id="@yicr/aws-budgets-notification.BudgetsNotificationProps.property.budgetLimitAmount"></a>

```typescript
public readonly budgetLimitAmount: number;
```

- *Type:* number

---

##### `slackChannelId`<sup>Required</sup> <a name="slackChannelId" id="@yicr/aws-budgets-notification.BudgetsNotificationProps.property.slackChannelId"></a>

```typescript
public readonly slackChannelId: string;
```

- *Type:* string

---

##### `slackWorkspaceId`<sup>Required</sup> <a name="slackWorkspaceId" id="@yicr/aws-budgets-notification.BudgetsNotificationProps.property.slackWorkspaceId"></a>

```typescript
public readonly slackWorkspaceId: string;
```

- *Type:* string

---

##### `linkedAccounts`<sup>Optional</sup> <a name="linkedAccounts" id="@yicr/aws-budgets-notification.BudgetsNotificationProps.property.linkedAccounts"></a>

```typescript
public readonly linkedAccounts: string[];
```

- *Type:* string[]

---



