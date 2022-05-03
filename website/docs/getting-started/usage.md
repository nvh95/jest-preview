---
sidebar_position: 6
---

# Usage

:::info

[Automatic Mode](/blog/automatic-mode) is now available and is recommended for general use, instead of manually triggering `preview.debug()`.
:::

### 1. Update to `package.json`

```json
{
  "scripts": {
    "jest-preview": "jest-preview"
  }
}
```

Optionally, you can use `npm-run-all` to run jest and `jest-preview` server in parallel

```json
{
  "scripts": {
    "test:debug": "npm-run-all -p test jest-preview"
  },
  "devDependencies": {
    "npm-run-all": "latest"
  }
}
```

### 2. Run the `jest-preview` server

```bash
# You can use PORT to customize port, default to 3336
npm run jest-preview
# Or
yarn jest-preview
pnpm run jest-preview
```

### 3. Preview your html from jest. Following code demo how to use it with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

```javascript
import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see the preview
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('2');
  });
});
```

Then visit http://localhost:3336 to see the preview.

<p align="center">
  <img alt="Preview your jest test in the browser" src="https://user-images.githubusercontent.com/8603085/161393898-7e283e38-6114-4064-9414-a0ce6d52361d.png" width="600" />
</p>

If you opt-in to [Automatic Mode](/blog/automatic-mode), Jest Preview will automatically preview your app UI in a browser whenever there is a failed test.

```js
describe('Demo', () => {
  it('should work as expected', () => {
    render(<Demo />);

    userEvent.click(screen.getByTestId('increase'));
    // userEvent.click(screen.getByTestId('increase'));

    expect(screen.getByTestId('count')).toContainHTML('2');
  });
});
```

<p align="center">
  <img alt="Preview your jest test in the browser" src="https://user-images.githubusercontent.com/8603085/166488340-45cae3bf-42e6-4e29-8031-df923c3ace83.gif" width="600" />
</p>
