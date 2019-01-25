---
category: Components
type: Data Display
title: Timeline
---

Vertical display timeline.

## When To Use

- When a series of information needs to be ordered by time (ascend or descend).
- When you need a timeline to make a visual connection.

## API

```html
<bl-timeline>
  <bl-timeline-item>step1 2015-09-01</bl-timeline-item>
  <bl-timeline-item>step2 2015-09-01</bl-timeline-item>
  <bl-timeline-item>step3 2015-09-01</bl-timeline-item>
  <bl-timeline-item>step4 2015-09-01</bl-timeline-item>
</bl-timeline>
```

### bl-timeline

Timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[blPending]` | Set the last ghost node's existence or its content | `string｜boolean｜TemplateRef<void>` | `false` |
| `[blPendingDot]` | Set the dot of the last ghost node when pending is true | `string｜TemplateRef<void>` | `<i bl-icon type="loading"></i>` |
| `[blReverse]` | Reverse nodes or not | `boolean` | `false` |
| `[blMode]` | By sending `alternate` the timeline will distribute the nodes to the left and right | `'left'｜'alternate'｜'right'` | - |

### bl-timeline-item

Node of timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[blColor]` | Set the circle's color to `blue`, `red`, `green` or other custom colors (css color) | `string` | `blue` |
| `[blDot]` | Customize timeline dot | `string｜TemplateRef<void>` | - |
