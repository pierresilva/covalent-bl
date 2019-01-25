---
category: Components
type: Feedback
noinstant: true
title: Notification
---

Display a notification message globally.

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be
used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details
  about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## How To Use

Similar to `BlMessage`, if you want to modify the global default configuration, you can modify the value of provider `BL_NOTIFICATION_CONFIG`.
(Example: Add `{ provide: BL_NOTIFICATION_CONFIG, useValue: { blDuration: 3000 }}` to `providers` of your module, `BL_NOTIFICATION_CONFIG` can be imported from `ng-zorro-antd`)

The default global configuration is:
```js
{
  blTop         : '24px',
  blBottom      : '24px',
  blPlacement   : 'topRight',
  blDuration    : 4500,
  blMaxStack    : 7,
  blPauseOnHover: true,
  blAnimate     : true
 }
```

## API

### BlNotificationService

The component provides a number of service methods using the following methods and parameters:

- `BlNotificationService.blank(title, content, [options])` // Notification without icon
- `BlNotificationService.success(title, content, [options])`
- `BlNotificationService.error(title, content, [options])`
- `BlNotificationService.info(title, content, [options])`
- `BlNotificationService.warning(title, content, [options])`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | - |
| content | Notification content | `string` | - |
| options | Support setting the parameters for the current notification box, see the table below | `object` | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| blKey | 	The unique identifier of the Notification | `string` |
| blDuration | Duration (milliseconds), does not disappear when set to 0 | `number` |
| blPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` |
| blAnimate | Whether to turn on animation | `boolean` |
| blStyle | Custom inline style | `object` |
| blClass | Custom CSS class | `object` |

Methods for destruction are also provided:

- `BlNotificationService.remove(id)` // Remove the notification with the specified id. When the id is empty, remove all notifications (the notification id is returned by the above method)

### Global configuration (BL_MESSAGE_CONFIG)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| blDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | 4500 |
| blMaxStack | The maximum number of notifications that can be displayed at the same time | `number` | 8 |
| blPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` | `true` |
| blAnimate | Whether to turn on animation | `boolean` | `true` |
| blTop | The top of the notification when it pops up from the top. | `string` | 24px |
| blBottom | The bottom of the notification when it pops up from the bottom. | `string` | 24px |
| blPlacement | Popup position, optional `topLeft` `topRight` `bottomLeft` `bottomRight` | `string` | `topRight` |