---
sidebar_position: 1
---

# debug()

Preview application's UI when testing with Jest to an external browser. Need to [start the Jest Preview](/docs/getting-started/usage#2-run-the-jest-preview-server) server beforehand.

:::info

[Automatic Mode](/blog/automatic-mode) is now available and is recommended for general use, instead of manually triggering `preview.debug()`.
:::

```diff
+import preview from 'jest-preview';
describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    preview.debug();
  });
});
```

Or:

```diff
+import { debug } from 'jest-preview';
describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    debug();
  });
});
```
