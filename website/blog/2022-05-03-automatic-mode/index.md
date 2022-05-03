---
slug: automatic-mode
title: Announcing Automatic Mode
authors: [nvh95, thanhsonng]
tags: [jest-preview, developer-experience]
# TODO
# image: /img/sass-support.png
---

<!-- Draft -->

We are so happy to annouce that we are launching Jest Preview **Automatic Mode**. In this mode, you don't have to trigger the `preview.debug()` function by yourself. Jest Preview automatically preview the UI of your app whenever Jest tests fail

Insert image

We believe this is the game changer feature of Jest Preview, which boost the FE productivity dramatically on debugging test. You don't have to move the `preview.debug()` around by yourself anymore. All you need is just a few lines of code

```js
jestPreviewConfigure({
  autoPreview: true,
});
```

**Automatic Mode** is in experiement and is an opt-in option. We recommend you to start use it now. Automatic Mode will be default mode in Jest Preview 0.3.0

If you have any trouble with Automatic Mode, opt out by...

Did you use Jest Preview Automatic Mode yet, let's us know by tweeting (insert I use Jest Preview Automatic Mode and it's great! #jest-preview #automatic-mode)
