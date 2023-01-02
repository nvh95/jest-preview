---
sidebar_position: 6
---

# 使用

:::info

[自动模式](/blog/automatic-mode) 目前已可用，并推荐常用以代替手动触发 `preview.debug()`。
:::

### 1. 更新 `package.json`

```json
{
  "scripts": {
    "jest-preview": "jest-preview"
  }
}
```

你可以选择使用 `npm-run-all` 来同时运行 Jest 和 `jest-preview`

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

### 2. 运行 `jest-preview` 服务

```bash
# 你可以用 PORT 来自定义端口，默认为 3336
npm run jest-preview
# 或
yarn jest-preview
pnpm run jest-preview
```

### 3. 在 Jest 中预览你的 html 代码 以下代码演示了如何与 [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) 一起使用

```javascript
import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // 打开 http://localhost:3336 查看预览
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('2');
  });
});
```

然后访问 http://localhost:3336 以查看预览。

<p align="center">
  <img alt="Preview your jest test in the browser" src="https://user-images.githubusercontent.com/8603085/161393898-7e283e38-6114-4064-9414-a0ce6d52361d.png" width="600" />
</p>

如果你选择了 [自动模式](/blog/automatic-mode)，只要有测试失败，Jest Preview 就会自动在浏览器中预览你的应用 UI。

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
