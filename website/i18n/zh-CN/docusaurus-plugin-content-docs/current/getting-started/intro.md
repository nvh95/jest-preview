---
sidebar_position: 1
description: 当使用Jest编写测试时，我们通常通过阅读HTML代码进行调试。有时HTML太复杂了，Jest Preview 帮助你在浏览器中“看见”你的测试。
---

# 介绍

## 认识 Jest Preview

我们相信你已经厌倦了调试集成 UI 测试和阅读一大堆隐晦的 HTML 输出。要将 DOM 结构可视化，并发现那里出了问题以及为什么出了问题，这实在是相当困难。我们感同身受。这就是为什么我们创建了 Jest Preview！

Jest Preview 是一个开源库使你的测试更轻松。它可以让你直接在浏览器中看到测试输出，就像你平时看你在做的应用程序一样。编写测试并观察渲染输出的相应变化，Jest Preview 让你专注于“真正的”的测试，而不是破译 HTML 代码。听起来是不是很有趣？快来试试吧 😉

👇 继续阅读以了解更多信息并尝试 Jest Preview 的操作

:::info
你可以直接前往 [安装](/docs/getting-started/installation) 指南，并在本地安装它
:::

## 特性

- 🐣 它的安装和使用都非常简单！
- 👀 在浏览器中以毫秒级的速度预览你的实际应用的 HTML
- 🔄 当执行 `preview.debug()` 时自动刷新浏览器
- 💅 支持的 CSS：
  - ✅ [直接引入 CSS](/docs/getting-started/installation#2-配置-jest-的-transform-以转换-css-和文件)
  - ✅ 相当多的 CSS-in-JS 库，例如：
    - ✅ [Styled-components](https://styled-components.com/)
    - ✅ [Emotion](https://emotion.sh/)
  - ✅ [全局 CSS](/docs/getting-started/installation#4-可选配置全局-css)
  - ✅ [CSS Modules](https://github.com/css-modules/css-modules)
  - ✅ [Sass](https://sass-lang.com/)
- 🌄 支持查看图片
- 🧑‍💻 我们的贡献者正努力增加更多功能并提供支持 ⚙️

:::info
愿意参与贡献吗？太棒了！我们非常感谢！请查看 [贡献](/docs/others/contributing) 文档 🙏
:::

## 在线 Demo

想要在安装前尝试一下这个库吗？我们为你准备好了！前往 [StackBlitz Demo App](https://stackblitz.com/edit/jest-preview?embed=1&file=README.md) 或在此尝试 😉

[![](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/jest-preview?file=src%2FApp.test.tsx,README.md)

<iframe id="iframe" height="600px" width="100%" style={{marginBottom: "24px" }} src="https://stackblitz.com/edit/jest-preview?embed=1&ctl=1&file=src%2FApp.test.tsx,README.md"></iframe>

:::tip 与框架无关
**Jest Preview** 最初是为了与 [jest](https://jestjs.io/) 和 [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) 一起使用。这个库与框架无关，你可以将其与**任何**测试库使用
:::

## 如何只用两行代码使用 Jest Preview

通过运行 CLI 命令 `jest-preview` 来启动 Jest Preview 本地服务器。更好的教程请参考 [安装](https://www.jest-preview.com/docs/getting-started/installation) 指南

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

:::tip 就是这么简单！😱
:::
