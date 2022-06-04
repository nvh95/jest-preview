---
sidebar_position: 2
---

# jestPreviewConfigure()

```js
// src/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';
// Configure external CSS
import './global.css';
import './global.scss';
import '@your-design-system/css/dist/index.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

jestPreviewConfigure({
  // Configure public folder if your public folder is not "public"
  publicFolder: 'your-public-folder-name',
});
```

## externalCss: string[] (Deprecated)

This option is deprecated. Please do not use. Instead, import the CSS directly. See the instruction at [Deprecate CSS](/)

<!-- (TODO: Add a new blog post to guide people to migrate) -->

## sassLoadPaths: string[]

Default: `[]`

Paths in which to look for stylesheets loaded by rules like `@use` and `@import` in sass files should be configured via `sassLoadPaths` option. They should be path from root of your project. For example:

```js
jestPreviewConfigure({
  // Configure Sass load paths
  sassLoadPaths: ['demo/assets/_scss/loadPathsExample'],
});
```

## publicFolder: string

Default: `undefined`.

Name of your public folder from the project root.

You don't have to configure this by yourself if your public folder is `public`. Below you can find a list of public directories which have different names than `public`:

<!-- Thanks msw for the idea https://github.com/mswjs/mswjs.io/blob/9f62d45a3740789cc4308ae1475027598541a007/docs/snippets/public-dir.mdx -->

| Project name                         | Public directory |
| ------------------------------------ | ---------------- |
| [GatsbyJS](https://www.gatsbyjs.org) | `static`         |
| [Angular](https://angular.io/)       | `src`            |
| [Preact](https://preactjs.com)       | `src/static`     |

## autoPreview: boolean

Default: `false` (`true` in `v0.3.0`)

Automatically preview the UI in the external browser when the test fails. You don't need to invoke `preview.debug()` by yourself anymore.

Set to `false` if you experience any error or just want to opt-out.
