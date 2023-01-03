---
sidebar_position: 1
---

# debug()

在使用 Jest 测试时在外部浏览器中预览应用程序的 UI。需要预先[启动 Jest Preview 服务](/docs/getting-started/usage#2-运行-jest-preview-服务)。

:::info

[自动模式](/blog/automatic-mode) 目前已可用，并推荐常用以代替手动触发 `preview.debug()`。
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

或：

```diff
+import { debug } from 'jest-preview';
describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+    debug();
  });
});
```
