---
slug: deprecate-externalCss
title: Deprecate externalCss option
authors: [nvh95]
tags: [jest-preview, backward-compatible, css]
image: /img/deprecate-externalCss.jpg
---

Previous Jest Preview provides a way to configure external CSS via `externalCss` option in `jestPreviewConfigure` function. However, we realized that we can actually import the css **DIRECTLY** in the setup test file (usually `setupFilesAfterEnv` in Jest config) instead. This way, we can use the same logic to process external CSS as well as CSS in your components.

<!--truncate-->

**What you need to do is as follow:**

```diff
// src/setupTests.js
-jestPreviewConfigure({
-  externalCss: ['src/global.css', 'src/assets/_scss/global-style.scss'],
-});
+import './global.css';
+import './assets/_scss/global-style.scss';
```

`externalCss` is not recommended to use anymore. Please do not use it. We are planning to remove it gradually with this road map:

> - [0.2.4](https://github.com/nvh95/jest-preview/releases/tag/v0.2.4): Add a warning to warn users if they use `externalCss`.
> - 0.3.0: Remove the code to process `externalCss` in `jestPreviewConfigure`, show an error if users use `externalCss`.
> - 0.4.0: Throw an error if users configure `externalCss`.
> - 0.5.0: Remove `externalCss` completely.

We hope with this change, Jest Preview will get better and better. Please reach us at [Issues](https://github.com/nvh95/jest-preview/issues) if you have any issues with this deprecation. Thanks.
