---
slug: deprecate-externalCss
title: Deprecate externalCss option
authors: [nvh95]
tags: [jest-preview, backward-compatible, semver]
# TODO: To add new social image
# image: /img/first-class-support-cra.jpg
---

TODO
Deprecate externalCss, instead, import directly

```diff
// src/setupTests.js
-jestPreviewConfigure({
-  externalCss: ['src/global.css', 'src/assets/_scss/global-style.scss'],
-});
+import './global.css';
+import './assets/_scss/global-style.scss';
```

- Same code to process css as in your component
- We can clean up the code in `jestPreviewConfigure`'s `externalCss`. We are naive to implement it. Credit @sundaycrafts for the idea.
- We try to make the breaking changes as small as possible (even jest-preview < 1.0.0). Roadmap: https://github.com/nvh95/jest-preview/issues/124#issuecomment-1140130106
- We add an article on how to migrate here (TODO)
