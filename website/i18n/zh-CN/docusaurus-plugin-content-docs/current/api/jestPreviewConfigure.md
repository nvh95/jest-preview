---
sidebar_position: 2
---

# jestPreviewConfigure()

```js
// src/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';
// 配置外部 CSS
import './global.css';
import './global.scss';
import '@your-design-system/css/dist/index.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

jestPreviewConfigure({
  // 如果你的公共目录不是 "public"，配置公共目录
  publicFolder: 'your-public-folder-name',
});
```

## externalCss: string[]（已弃用）

此参数已弃用，请勿使用。直接导入 CSS 即可。请参阅 [弃用 CSS](/blog/deprecate-externalCss) 中的说明。

## sassLoadPaths: string[]

默认值：`[]`

通过 `sassLoadPaths` 参数应配置用于在 sass 文件中的规则（例如 `@use` 和 `@import`）加载样式表的路径。它们应该为在项目根目录下路径。例如：

```js
jestPreviewConfigure({
  // 配置 Sass 加载路径
  sassLoadPaths: ['demo/assets/_scss/loadPathsExample'],
});
```

## publicFolder: string

默认值：`undefined`

在项目根目录下你的公共目录名。
Name of your public folder from the project root.

如果公共目录是 `public`，则无需自行配置。以下为公共目录名不是 `public` 的列表：

| 项目名                               | 公共目录     |
| ------------------------------------ | ------------ |
| [GatsbyJS](https://www.gatsbyjs.org) | `static`     |
| [Angular](https://angular.io/)       | `src`        |
| [Preact](https://preactjs.com)       | `src/static` |

## autoPreview: boolean

默认值：`false`

当测试失败时，自动在外部浏览器中预览 UI。你不需要再自己调用 `preview.debug()` 了。

如果遇到任何错误或只想选择退出，请设置为 `false` 。
