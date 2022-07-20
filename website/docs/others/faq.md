---
sidebar_position: 1
---

# Frequently Asked Questions

## I can see HTML on my browser, but without any CSS

There are a few reasons that you might not see CSS on the Jest Preview Dashboard (`jest-preview`):

- Jest Preview generally uses [Code Transformation](https://jestjs.io/docs/code-transformation) to process CSS. You might forget to configure the `transform` in your Jest's config. Please see [**Installation**](/docs/getting-started/installation) for more. If you are using [Create React App](https://create-react-app.dev/), you might want to visit [CRA Example](/docs/examples/create-react-app). If you are using [Next.js](https://nextjs.org/), you might want to visit [Next.js example](https://www.jest-preview.com/docs/examples/nextjs).
- If you already configure CSS transform, there is a very high chance that Jest is caching your CSS files. Please [**delete Jest's cache**](https://jestjs.io/docs/cli#--clearcache) by running `jest --clearCache`.
- You might have some CSS files that are not imported to your current testing component (i.e: `src/index.jsx`, `src/main.jsx`). You can configure global CSS using `jestPreviewConfigure`. See more at [**Installation**](/docs/getting-started/installation#4-optional-configure-global-css).

```js
// src/setupTests.js
import './global.css';
import '@your-design-system/css/dist/index.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
```

- Your CSS strategy is not supported by Jest Preview yet. Please see [**Features**](/docs/getting-started/intro#features) for supported CSS strategies. Feel free to [Request a new feature](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=&template=feature_request.md&title=) if you want Jest Preview supports your use case.
- It might be a bug from Jest Preview. Let us know at [Bug Report](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=&template=bug_report.md&title=).

## I couldn't use Automatic Mode

Automatic Mode is in the experimental phase. If you are experiencing any issues when using Automatic Mode, please let us know at [Jest Preview's GitHub issue](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=&template=bug_report.md&title=). We appreciate your feedback and it would be super helpful for us to have a reproducible repository.

## The preview does not reload automatically

This is likely that you are using a Linux system. Please update [jest-preview](https://www.npmjs.com/package/jest-preview) to the newest version (`>= 0.2.8`) to get the problem fixed. If it still persists, please help to [report a bug](https://github.com/nvh95/jest-preview/issues/new?assignees=&labels=bug&template=bug_report.md&title=) with a minimum reproduction.
