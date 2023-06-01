<!--header--># sppt/no-console

> Disallow console expressions
>
> - ⭐️ This rule is included in `plugin:sppt/recommended` preset.
> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

<!--header--><!--cases-->

## Cases

### ✅ Correct

```ts
count(1);
```

```ts
error(1);
```

```ts
info(1);
```

```ts
log(1);
```

```ts
profile(1);
```

```ts
time(1);
```

```ts
timeEnd(1);
```

```ts
timeStart(1);
```

### ❌ Incorrect

```ts
console.count(1);
```

```ts
console.error(1);
```

```ts
console.info(1);
```

```ts
console.profile(1);
```

```ts
console.time(1);
```

```ts
console.timeEnd(1);
```

```ts
console.timeStart(1);
```

<!--cases-->

## Rule Details

(TODO: how does this rule check code?)

## Options

(TODO: what do options exist?)

<!--footer-->

## Implementation

- [Rule source](../../src/rules/no-console.ts)
- [Test source](../../tests/rules/no-console.ts)
<!--footer-->
