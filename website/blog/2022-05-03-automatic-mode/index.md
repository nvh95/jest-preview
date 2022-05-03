---
slug: automatic-mode
title: Introducing Automatic Mode
authors: [nvh95, thanhsonng]
tags: [jest-preview, developer-experience]
image: /img/automatic-mode.png
---

We are so happy to annouce that we are launching Jest Preview **Automatic Mode**. In this mode, you don't have to trigger the `preview.debug()` function by yourself. Jest Preview **AUTOMATICALLY** preview the UI of your app **WHENEVER a Jest test fails**.

![Jest Preview Automatic Mode](https://user-images.githubusercontent.com/8603085/166488340-45cae3bf-42e6-4e29-8031-df923c3ace83.gif)

We believe this is the game changer feature of Jest Preview, which boost the Front end productivity dramatically on writing new tests and debugging existing tests. You don't have to move the `preview.debug()` around by yourself anymore. All you need to do is just one line of code:

```js
// setupTests.ts
jestPreviewConfigure({ autoPreview: true });
```

**Automatic Mode** is in experiement and currently is an opt-in option. We recommend you to start use it now. Automatic Mode expect to be the default mode in Jest Preview 0.3.0.

If you have any trouble with Automatic Mode, let us know at [Jest Preview's GitHub issue](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=&template=bug_report.md&title=)

Did you use Jest Preview Automatic Mode yet? [Let us know](https://twitter.com/intent/tweet?text=I%20used%20Jest%20Preview%20Automatic%20Mode%20and%20it%27s%20awesome!%20%23jestpreview)!
