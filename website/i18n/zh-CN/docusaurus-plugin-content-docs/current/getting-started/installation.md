---
sidebar_position: 4
---

# 安装

### 1. 安装 `jest-preview`

```bash
npm install --save-dev jest-preview
# 或
yarn add --dev jest-preview
pnpm add -D jest-preview
```

### 2. 配置 jest 的 transform 以转换 CSS 和文件

:::info
如果你在使用 Create React App，只需要在这一步执行 `npx jest-preview config-cra`
:::

`jest-preview` 带有预配置的转换功能用于拦截 CSS 和文件，这是一种推荐的配置方式。不过你也可以自己导出 transform 函数来配置它。参见 [高级配置](/docs/advanced-guides/code-transform) 了解更多。

更新 `jest.config.js`:

```js
transform: {
  "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
  "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
}
```

对于正在使用 Rust 编译器的 Next.js 用户，请使用 [configureNextJestPreview](/docs/api/configureNextJestPreview) 来配置 Jest。参见 [Next.js 示例](https://github.com/nvh95/jest-preview/tree/main/examples/nextjs) 了解更多。

### 3. 如果你正在使用 CSS Modules，请确保它不会被忽略

:::info
如果你在使用 Create React App，只需要在这一步执行 `npx jest-preview config-cra`
:::

在大多数情况下，CSS Modules 在 Jest 环境中被忽略。例如，Create React App 的默认配置通过 [transformIgnorePatterns](https://github.com/facebook/create-react-app/blob/63bba07d584a769cfaf7699e0aab92ed99c3c57e/packages/react-scripts/scripts/utils/createJestConfig.js#L53) 和 [moduleNameMapper](https://github.com/facebook/create-react-app/blob/63bba07d584a769cfaf7699e0aab92ed99c3c57e/packages/react-scripts/scripts/utils/createJestConfig.js#L58) 忽略 CSS Modules。为了使 CSS Modules 在 Jest Preview 中工作，我们需要确保它不会被忽略。请移除忽略 CSS Modules 的选项或使用第三方库的映射（如 [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy)）。

```diff
// jest.config.js
transformIgnorePatterns: [
-  '^.+\\.module\\.(css|sass|scss)$',
],
moduleNameMapper: {
-  '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
},
```

### 4. （可选）配置全局 CSS

有时，一些 CSS 文件被导入到你当前的测试组件之外（例如：在 `src/index.js`、`src/main.tsx` 中导入的 CSS）。在这种情况下，你可以手动添加这些 CSS 文件到 Jest 设置。

```js
// jest.config.js
{
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
```

```js
// src/setupTests.js
import './global.css';
import '@your-design-system/css/dist/index.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
```

### 5. （可选）配置公共目录

如果你的公共目录是 `public` 则无需改动。如果它不是，请按照如下方式配置:

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// 应为你的项目根目录下的路径
jestPreviewConfigure({
  publicFolder: 'static', // 若 `publicFolder` 为 `public` 则无需配置
});
```

以下是非 `public` 的公共目录列表：

<!-- Thanks msw for the idea https://github.com/mswjs/mswjs.io/blob/9f62d45a3740789cc4308ae1475027598541a007/docs/snippets/public-dir.mdx -->

| 项目名                               | 公共目录     |
| ------------------------------------ | ------------ |
| [GatsbyJS](https://www.gatsbyjs.org) | `static`     |
| [Angular](https://angular.io/)       | `src`        |
| [Preact](https://preactjs.com)       | `src/static` |

### 6. （推荐可选）添加自动模式

**自动模式** 让你在使用 [jest-preview](https://www.npmjs.com/package/jest-preview) 时无需手动触发 `preview.debug()` 。只要有测试失败，它就会在浏览器中自动预览你的代码。

```js
jestPreviewConfigure({ autoPreview: true });
```
