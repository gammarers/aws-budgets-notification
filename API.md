# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BudgetsNotification <a name="BudgetsNotification" id="@gammarers/aws-budgets-notification.BudgetsNotification"></a>

#### Initializers <a name="Initializers" id="@gammarers/aws-budgets-notification.BudgetsNotification.Initializer"></a>

```typescript
import { BudgetsNotification } from '@gammarers/aws-budgets-notification'

new BudgetsNotification(scope: Construct, id: string, props: BudgetsNotificationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotification.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotification.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotification.Initializer.parameter.props">props</a></code> | <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotificationProps">BudgetsNotificationProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@gammarers/aws-budgets-notification.BudgetsNotification.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@gammarers/aws-budgets-notification.BudgetsNotification.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@gammarers/aws-budgets-notification.BudgetsNotification.Initializer.parameter.props"></a>

- *Type:* <a href="#@gammarers/aws-budgets-notification.BudgetsNotificationProps">BudgetsNotificationProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotification.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@gammarers/aws-budgets-notification.BudgetsNotification.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotification.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@gammarers/aws-budgets-notification.BudgetsNotification.isConstruct"></a>

```typescript
import { BudgetsNotification } from '@gammarers/aws-budgets-notification'

BudgetsNotification.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@gammarers/aws-budgets-notification.BudgetsNotification.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotification.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@gammarers/aws-budgets-notification.BudgetsNotification.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### BudgetsNotificationProps <a name="BudgetsNotificationProps" id="@gammarers/aws-budgets-notification.BudgetsNotificationProps"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-budgets-notification.BudgetsNotificationProps.Initializer"></a>

```typescript
import { BudgetsNotificationProps } from '@gammarers/aws-budgets-notification'

const budgetsNotificationProps: BudgetsNotificationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.budgetLimitAmount">budgetLimitAmount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.slackChannelId">slackChannelId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.slackWorkspaceId">slackWorkspaceId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.linkedAccounts">linkedAccounts</a></code> | <code>string[]</code> | *No description.* |

---

##### `budgetLimitAmount`<sup>Required</sup> <a name="budgetLimitAmount" id="@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.budgetLimitAmount"></a>

```typescript
public readonly budgetLimitAmount: number;
```

- *Type:* number

---

##### `slackChannelId`<sup>Required</sup> <a name="slackChannelId" id="@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.slackChannelId"></a>

```typescript
public readonly slackChannelId: string;
```

- *Type:* string

---

##### `slackWorkspaceId`<sup>Required</sup> <a name="slackWorkspaceId" id="@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.slackWorkspaceId"></a>

```typescript
public readonly slackWorkspaceId: string;
```

- *Type:* string

---

##### `linkedAccounts`<sup>Optional</sup> <a name="linkedAccounts" id="@gammarers/aws-budgets-notification.BudgetsNotificationProps.property.linkedAccounts"></a>

```typescript
public readonly linkedAccounts: string[];
```

- *Type:* string[]

---



