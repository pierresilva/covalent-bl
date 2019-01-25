---
category: Components
type: Feedback
noinstant: true
title: Message
---

Display global messages as feedback in response to user operations.

## When To Use

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## How To Use

If you want to modify the global default configuration, you can modify the value of provider `BL_MESSAGE_CONFIG`.
(eg, add `{ provide: BL_MESSAGE_CONFIG, useValue: { blDuration: 3000 }}` to `providers` of your module, `BL_MESSAGE_CONFIG` can be imported from `ng-zorro-antd`)

The default global configuration is:
```js
{
  blDuration: 3000,
  blMaxStack: 7,
  blPauseOnHover: true,
  blAnimate: true
}
```

## API

### BlMessageService

This components provides some service methods, with usage and arguments as following:

- `BlMessageService.success(content, [options])`
- `BlMessageService.error(content, [options])`
- `BlMessageService.info(content, [options])`
- `BlMessageService.warning(content, [options])`
- `BlMessageService.loading(content, [options])`

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| content | The content of message | `string` | - |
| options | Support setting the parameters for the current message box, see the table below | `object` | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| blDuration | Duration (milliseconds), does not disappear when set to 0 | `number` |
| blPauseOnHover | Do not remove automatically when mouse is over while setting to `true`  | `boolean` |
| blAnimate | Whether to turn on animation | `boolean` |

Methods for destruction are also provided:

- `message.remove(id)` // Remove the message with the specified id. When the id is empty, remove all messages (the message id is returned by the above method)

### Global configuration (BL_MESSAGE_CONFIG)

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| blDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | `3000` |
| blMaxStack | The maximum number of messages that can be displayed at the same time | `number` | `8` |
| blPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` | `true` |
| blAnimate | Whether to turn on animation | `boolean` | `true` |
