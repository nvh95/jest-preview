---
slug: first-class-support-cra
title: First class support for Create React App
authors: [nvh95]
tags: [jest-preview, developer-experience, create-react-app]
# TODO To update
# image: /img/automatic-mode.png
---

CRA is well known for bootstrapping a React App. It hides the complexity of bundling and configuration over `react-scripts`. However, in some scenarios, it's very hard to customize CRA for a specific purpose. Make Jest Preview works seamlessly with CRA is an example. Currently, there is no way to customize CRA's `jest.config.js` file easily. So, Jest Preview bundles a few CLIs to make integrating Jest Preview to CRA easier.

Option 1: Use codemod:

- Run this CLI `jest-preview config-cra`

Option 2: Configure manually

1. Create `jest.config.js`

- Create `jest.config.js` with following content:

1. Update test script in `package.json`

```diff
{
  "scripts": {
-    "test": "react-scripts test"
+    "test": "node scripts/test.js"
  }
}
```

1. Create test script
