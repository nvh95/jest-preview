---
sidebar_position: 4
---

# Installation

### 1. Install `jest-preview`

```bash
npm install --save-dev jest-preview
# Or
yarn add --dev jest-preview
pnpm install --dev jest-preview
```

### 2. Configure jest's transform to transform CSS and files

`jest-preview` comes with pre-configured transformations to intercept CSS and files. This is a recommended way to configure. However, you can configure it yourself using exported transform functions as well. See [Advanced configurations](#advanced-configurations) for more.

Update `jest.config.js`:

```js
transform: {
  "^.+\\.(css|scss|sass)$": "jest-preview/transforms/css",
  "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
}
```

For Create React App users, please use `jest-preview/transforms/fileCRA` instead of `jest-preview/transforms/file`. See more at [Create React App example](/docs/examples/create-react-app).

For Next.js users with Rust-based compiler, please use [configureNextJestPreview](/docs/api/configureNextJestPreview) to config Jest. See more at [Next.js example](https://github.com/nvh95/jest-preview/tree/main/examples/nextjs).

### 3. If you use CSS Modules, make sure it doesn't get ignored

In most cases, CSS Modules is ignored in Jest environment. For example, Create React App default configuration ignores CSS Modules via [transformIgnorePatterns](https://github.com/facebook/create-react-app/blob/63bba07d584a769cfaf7699e0aab92ed99c3c57e/packages/react-scripts/scripts/utils/createJestConfig.js#L53) and [moduleNameMapper](https://github.com/facebook/create-react-app/blob/63bba07d584a769cfaf7699e0aab92ed99c3c57e/packages/react-scripts/scripts/utils/createJestConfig.js#L58). To make CSS Modules works with Jest Preview, we need to make sure it isn't ignored. Remove options to ignore CSS Modules or mapping using a third party library (such as [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy)).

```diff
// jest.config.js
transformIgnorePatterns: [
-  '^.+\\.module\\.(css|sass|scss)$',
],
moduleNameMapper: {
-  '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
},
```

### 4. (Optional) Configure external CSS

Sometimes, there are some CSS files imported outside your current test components (e.g: CSS imported in `src/index.js`, `src/main.tsx`). In this case, you can manually add those CSS files to `jest-preview` by `jestPreviewConfigure`. Notice that they should be path from root of your project.

```js
  // jest.config.js
  {
    setupFilesAfterEnv: ["./config/jest/setupTests.js"],
  }
```

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  externalCss: [
    'demo/global.css',
    'node_modules/@your-design-system/css/dist/index.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
});
```

### 5. (Optional) Configure public folder

You don't need to do anything if your public folder is `public`. However, if it's different, you can configure as following:

<!-- To add Common public directories as msw does
 when we have a dedicated docs site. https://mswjs.io/docs/getting-started/integrate/browser#where-is-my-public-directory -->

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  publicFolder: 'static', // No need to configure if `publicFolder` is `public`
});
```

### 5. (Optional- RECOMMENDED) Opt-in to Automatic Mode

**Automatic Mode** let you use [jest-preview](https://www.npmjs.com/package/jest-preview) without manually triggering `preview.debug()`. It previews your code in the browser automatically whenever there is a failed test. It's a experimental feature from v0.2.0 and becomes the default in v0.3.0.

```js
jestPreviewConfigure({ autoPreview: true });
```
