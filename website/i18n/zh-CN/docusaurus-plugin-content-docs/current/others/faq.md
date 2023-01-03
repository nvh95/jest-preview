---
sidebar_position: 1
---

# 常见问题

## 我能在浏览器上看到 HTML，但没有 CSS

由于如下原因，你可能无法在 Jest Preview Dashboard (`jest-preview`) 上看到 CSS：

- Jest Preview 通常使用 [代码转换](https://jestjs.io/docs/code-transformation) 来处理 CSS，你可能忘记在 Jest 中配置 `transform`。更多内容请参见[**安装**](/docs/getting-started/installation)。 如果你正在使用 [Create React App](https://create-react-app.dev/)，你可以参考 [CRA 用例](/docs/examples/create-react-app)。如果你在使用 [Next.js](https://nextjs.org/)，你可以参考 [Next.js 用例](https://www.jest-preview.com/docs/examples/nextjs)。
- 如果你已经配置了 CSS 转换，那么很有可能 Jest 正在缓存你的 CSS 文件。请使用`jest --clearCache`清除 Jest 缓存。
- 可能有一些 CSS 文件没有被导入到你当前的测试组件中（例如：`src/index.jsx`, `src/main.jsx`）。你可以通过在 `setupTests.js` 中导入来配置全局 CSS。更多信息请见[**安装**](/docs/getting-started/installation#4-可选配置全局-css)。

```js
// src/setupTests.js
import './global.css';
import '@your-design-system/css/dist/index.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
```

- 你的 CSS 方案尚未被 Jest Preview 支持。请参阅[支持的 CSS 方案](/docs/getting-started/intro#特性)。如果你希望 Jest Preview 支持你使用的方案，欢迎[申请新特性](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=&template=feature_request.md&title=)。

## 我无法使用自动模式

自动模式处于实验阶段。 如果使用自动模式时遇到任何问题，请在 [Jest Preview's GitHub issue](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=&template=bug_report.md&title=) 中告诉我们。我们非常感谢你的反馈，如果有可重现的存储库会对我们有很大的帮助。

## 预览没有自动刷新

很可能您正在使用 Linux 系统。请将 [jest-preview](https://www.npmjs.com/package/jest-preview) 更新到最新版本（`>=0.2.8`）以修复问题。如果仍有问题，请到 [报告错误](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=bug&template=bug_report.md&title=) 中寻求帮助，并提供最小的重现步骤。

## `styled-components` 的全局样式无效？

由于 `styled-components` 通过不同的方式处理 Node.js 环境和浏览器环境中的全局样式。因此，请在 <https://github.com/nvh95/jest-preview/tree/main/examples/vite-react/src/__tests__/global-style-components.test.tsx> 中查看解决方案。
