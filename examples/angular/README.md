# Angular CLI

## Integrating Jest Preview to Angular CLI

This example demonstrates how to use `jest-preview` with the Angular CLI. See the full source code at [Angular CLI Example on GitHub](https://github.com/nvh95/jest-preview/tree/main/examples/angular)

## Setup Jest with Angular CLI

Use an [`@angular-builders/jest`](https://www.npmjs.com/package/@angular-builders/jest) builder for the `test` architect target of your application project.

Either use Jest projects or add the `src` directory of your application project to the `roots` option of your Jest configuration, for example:

```js
module.exports =
  /** @type {import('@jest/types').Config.InitialOptions} */
  {
    roots: ['<rootDir>/src'],
  };
```

## Installation and Usage

Please refer to [Installation](/docs/getting-started/installation) and [Usage](/docs/getting-started/usage).

In step 4 of installation, **Configure global CSS**, add import statements matching the global stylesheets loaded by he `styles` option of your application's `build` architect target, for example:

```typescript
import './styles.css';
```

In step 5 of installation, **Configure public folder**, set the `publicFolder` option for `jestPreviewConfigure` to your application project's `src` directory, for example:

```typescript
import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  publicFolder: 'src',
});
```
