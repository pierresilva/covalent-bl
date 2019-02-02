---
category: Components
type: Data Display
title: Badge
---

Small numerical value or status descriptor for UI elements.

## When To Use

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

## API

```html
<bl-badge [blCount]="5">
  <a class="head-example"></a>
</bl-badge>
```

```html
<bl-badge [blCount]="5"></bl-badge>
```

### bl-badge

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[blCount]` | Number to show in badge | number |  |
| `[blDot]` | Whether to display a red dot instead of `count` | boolean | `false` |
| `[blShowDot]` | Whether to display the red dot | boolean | true |
| `[blOverflowCount]` | Max count to show | number | 99 |
| `[blShowZero]` | Whether to show badge when `count` is zero | boolean | `false` |
| `[blStatus]` | Set `bl-badge` as a status dot | `success` ｜ `processing` ｜ `default` ｜ `error` ｜ `warning` | `''` |
| `[blText]` | If `blStatus` is set, `text` sets the display text of the status `dot` | string | `''` |
