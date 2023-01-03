---
sidebar_position: 3
---

# configureNextJestPreview()

`configureNextJestPreview` 用于配置 [基于 Rust 编译器](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler) 的 [Next.js](https://nextjs.org) 项目。

你只需要用 `configureNextJestPreview` 包装你当前的配置即可使用。

```diff
const nextJest = require('next/jest')
+ const { configureNextJestPreview } = require('jest-preview')

const createJestConfig = nextJest({
  // 提供 Next.js 应用的路径，用于在测试环境中加载 next.config.js 和 .env 文件
  dir: './',
})

// 添加要传递给 Jest 的任何自定义配置
const customJestConfig = {
  // 在运行每个测试之前添加更多设置选项
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // 如果使用 TypeScript 并将 baseUrl 设置为根目录，则还需要修改一下内容才能使别名生效
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}
- module.exports = createJestConfig(customJestConfig)
+ module.exports = configureNextJestPreview(createJestConfig(customJestConfig));
```
