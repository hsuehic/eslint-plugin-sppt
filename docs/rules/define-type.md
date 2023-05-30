# sppt/define-type

> Enforce type anotation for array declaration.
>
> - ⭐️ This rule is included in `plugin:sppt/recommended` preset.

This is an example.

## Rule Details

This rule enforce add type annotation for declaration.

Examples of **incorrect** code:

```js
/*eslint template/example-rule: error */

var example = 1;
```

Examples of **correct** code:

```js
/*eslint template/example-rule: error */

var foo: number = 1;
```

## Options

Nothing.

## Implementation

- [Rule source](../../src/rules/define-type.ts)
- [Test source](../../tests/rules/define-type.ts)
