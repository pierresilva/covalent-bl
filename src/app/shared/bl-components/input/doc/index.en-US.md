---
category: Components
type: Data Entry
title: Input
---

A basic widget for getting the user input is a text field.
Keyboard and mouse can be used for providing or changing data.

## When To Use

- A user input in a form field is needed.
- A search input is required.

## API

### [bl-input]

All props of input supported by [w3c standards](https://www.w3schools.com/tags/tag_input.asp) and Angular can used in `bl-input`.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[blSize]` | The size of the input box. Note: in the context of a form, the `large` size is used. | `'large'｜'small'｜'default'` | `'default'` |
| `[blAutosize]` | Only used for `textarea`, height autosize feature, can be set to `boolean` or an object `{ minRows: 2, maxRows: 6 }` | `boolean｜{ minRows: number, maxRows: number }` | `false` |


### bl-input-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[blAddonAfter]` | The label text displayed after (on the right side of) the input field. | `string｜TemplateRef<void>` | - |
| `[blAddonBefore]` | The label text displayed before (on the left side of) the input field. | `string｜TemplateRef<void>` | - |
| `[blPrefix]` | The prefix icon for the Input. | `string｜TemplateRef<void>` | - |
| `[blSuffix]` | The suffix icon for the Input. | `string｜TemplateRef<void>` | - |
| `[blCompact]` | Whether use compact style | `boolean` | `false` |
| `[blSize]` | The size of `bl-input-group` specifies the size of the included `bl-input` fields | `'large'｜'small'｜'default'` | `'default'` |
