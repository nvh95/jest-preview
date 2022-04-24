---
sidebar_position: 3
---

# configureNextJestPreview()

`configureNextJestPreview` is to be used for configuring [Next.js](https://nextjs.org) project with [Rust-based compiler](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler).

You just need to wrap your current config with `configureNextJestPreview` and you are ready to go.

```diff
const nextJest = require('next/jest')
+ const { configureNextJestPreview } = require('jest-preview')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}
- module.exports = createJestConfig(customJestConfig)
+ module.exports = configureNextJestPreview(createJestConfig(customJestConfig));
```
