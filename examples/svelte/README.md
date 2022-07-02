# Use with Svelte

This example demonstrates how to use `jest-preview` with [`Svelte`](https://svelte.dev) and [`Svelte Testing Library`](https://testing-library.com/docs/svelte-testing-library/intro/)

## Install Jest

This example follows [Component Testing in Svelte](https://www.thisdot.co/blog/component-testing-in-svelte) from [This Dot Labs](https://www.thisdot.co), credit to [Ignacio Falk](https://twitter.com/flakolefluk). Please follow this tutorial if your project is not setup to use Jest yet.

## Install and use Jest Preview

:::info
You can read the generic guide at https://www.jest-preview.com/docs/getting-started/installation
:::

Install Jest Preview

```bash
npm install --save-dev jest-preview
```

Configure code transforms as follow:

```js
// jest.config.js
transform: {
  "^.+\\.(css|scss|sass)$": "jest-preview/transforms/css",
  "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
}
```

(You might not need to configure CSS transform if you only use [Svelte built-in CSS solution](https://svelte.dev/tutorial/styling).)

If you use any global CSS, import in in your jest setup file. You can also opt-in to [Automatic Mode](https://www.jest-preview.com/blog/automatic-mode) by setting `autoPreview` to `true` so your failed test gets a preview automatically! 🤯

```js
// setupTests.js
import { jestPreviewConfigure } from 'jest-preview';
import './app/styles/global.css'; // Import any global CSS

jestPreviewConfigure({
  // Enable autoPreview so Jest Preview runs automatically
  // whenever your test fails, without you having to do anything!
  autoPreview: true,
});
```

That's it! Now you can use Jest Preview in your test. First, start Jest Preview Dashboard by

```
jest-preview
```

Just put `debug()` wherever you want to preview the UI?

```diff
import { render, fireEvent, screen } from '@testing-library/svelte';
import { debug } from 'jest-preview';
import App from '../../App.svelte';

describe('Counter Component', () => {
  it('it changes count when button is clicked', async () => {
    render(App);
    const button = screen.getByText(/Clicks:/);
    expect(button.innerHTML).toBe('Clicks: 0');
    await fireEvent.click(button);
    expect(button.innerHTML).toBe('Clicks: 1');

+    debug();
  });
});
```

Then run your test command (e.g: `npm run test`). The UI will be previewed at http://localhost:3336

You might as well add some NPM scripts for convenience:

```diff
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
+ "test": "jest --watch",
+ "jest-preview": "jest-preview"
},
```

```bash
npm run jest-preview

npm run test
```

You may even install `npm-run-all` to simplify this further:

```bash
npm install --save-dev npm-run-all
```

```diff
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest --watch",
  "jest-preview": "jest-preview",
+ "test:preview": "npm-run-all -p test jest-preview"
},
```

```bash
npm run test:preview
```
