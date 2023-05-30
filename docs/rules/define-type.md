# sppt/define-type

> Enforce type anotation for array declaration.
>
> - ⭐️ This rule is included in `plugin:sppt/recommended` preset.

> An example rule.
>
> - ⭐️ This rule is included in `plugin:xxxx/recommended` preset.

This is an example.

## Rule Details

This rule aimed at disallowing `example` identifiers.

Examples of **incorrect** code:

```js
/*eslint template/example-rule: error */

var example = 1;
```

Examples of **correct** code:

```js
/*eslint template/example-rule: error */

var foo = 1;
```

## Options

Nothing.

## Implementation

- [Rule source](../../src/rules/define-type.ts)
- [Test source](../../tests/rules/define-type.ts)