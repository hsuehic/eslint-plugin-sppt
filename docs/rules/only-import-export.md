<!--header-->

# sppt/only-import-export

> Allow only import and export statements in index files
>
> - ⭐️ This rule is included in `plugin:sppt/recommended` preset.

<!--header-->

<!--cases-->

## Cases

### ✅ Correct

File name: `index.js`

```ts
import { Sidebar } from './sidebar';
export { Sidebar };
```

File name: `index.ts`

```ts
import { Sidebar } from './sidebar';
export { Sidebar };
```

File name: `index.js`

```ts
import { Sidebar } from './sidebar';
export default Sidebar;
```

File name: `index.js`

```ts
import Sidebar from './sidebar';
```

File name: `index.js`

```ts
export * from './sidebar';
```

### ❌ Incorrect

```ts
import { Sidebar } from './sidebar';
const count = 0;
```

```ts
import { Sidebar } from './sidebar';
export const count = 0;
```

```ts
import { Sidebar } from './sidebar';
export function Page() {}
```

```ts
export default function () {}
```

```ts
export const Component = () => <div />;
```

<!--cases-->

To make modules clear for comsumers, and make the modules more maintainable, without worrying about comsumers use unintended exports.

## Rule Details

Refer to [Cases](#cases)

## Options

N/A

<!--footer-->

## Implementation

- [Rule source](../../src/rules/only-import-export.ts)
- [Test source](../../tests/rules/only-import-export.ts)
<!--footer-->
