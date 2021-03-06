# Badge

A Badge component is a UI element that helps indicate the count, state, or status of something.

## Example

```html
<Badge status="info">Jazz Flute</Badge>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| status | string | Changes the color of the component to the corresponding status. |
| size | number | Adjust component size. |
| white | boolean | Applies a white style to the component. |


### Status

| Value | Description |
| --- | --- |
| `error` | Colors the badge red. |
| `info` | Colors the badge blue. |
| `success` | Colors the badge green. |
| `warning` | Colors the badge yellow. |
