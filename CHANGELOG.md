# 0.2.0

## Features

- Auto preview UI whenever a test fails, you don't have to call `preview.debug()` manually.

# 0.1.7

## Fixes

- Fix jest-preview postinstall script can't run on folder with space in name

# 0.1.6

## Features

- Add an adapter for [Next.js's Rust compiler for Jest](https://nextjs.org/docs/advanced-features/compiler#jest)
- Add examples for and [Next Jest Rust Compiler](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler) and [Next Jest Babel](https://nextjs.org/docs/testing#setting-up-jest-with-babel)

# 0.1.5

## Features

- Support non-english characters and responsive design.
- Support Sass.

# 0.1.4

## Fixes

- Fix: `jest --clearCache` might break user's installation flow since `jest` might be installed after `jest-preview`.

# 0.1.3

## Features

- Support serving files from Public folder.
- Clear Jest cache after installation.

## Fixes

- Update rollup to:
  - Terser
  - Transpile to ES2019 (e.g: optional chaining)

## Chores

- Export `debug` as named also.
- Handle CSS Modules asynchronously.

# 0.1.2

## Features

- Add pre-configured transformers, so users can integrate `jest-preview` to their projects easier.
  - `jest-preview/transforms/css`
  - `jest-preview/transforms/file`
  - `jest-preview/transforms/fileCRA`

# 0.1.1

## Features

- Support CSS Modules.
  - Caveat: Support CSS Modules for CRA in next version.

# 0.1.0

## Features

- [BREAKING CHANGES] Simplify usage of the core function of jest-preview: `preview(htmlElement)` to `preview.debug()`.
- Users do not need to pass any argument to `preview.debug()`, the default is `document.body` which is the whole page (how authors expect users to use jest-preview).
- Add `title` and `favicon.ico` for Dashboard.

## Fixes

- [x] Fix `externalCss` get cached.

# 0.0.3

## Features

- Rewrite transforms. Do not need to copy assets to cache folder.
- Add `processFileCRA` for CRA file transform.
- [BREAKING CHANGES for CRA users] CRA users need to update `fileTransform.js` to use `processFileCRA`. See more at [CRA README.md](./examples/create-react-app/README.md#installation-and-usage).

## Chores

- Simplify the usage in docs and examples: `preview(render(<App />).container)` => `preview(document.body)`.

# 0.0.2

[0.0.2-alpha.0](#002-alpha0)

## Chores

- Reuse opening jest-preview server tab on Chrome Mac.

# 0.0.2-alpha.0

## Fixes

- [x] Fix #15

## Chores

- [x] Update publish scripts.

# 0.0.1

## Features

- Add `previewServer` expose as `jest-preview` cli.
- Add css and file transforms.
  - Support direct CSS import.
  - Support viewing images, media files...
- Support styled-components.
- Reload browser using web socket.

# 0.0.1-alpha.1

## Features

- Watch `index.html` on created and removed. Add websocket reload for fallback page.
- Fix README.md.

# 0.0.1-alpha.0

## Features

- Add `previewServer` expose as `jest-preview` cli.
- Add css and file transforms.
  - Support direct CSS import.
  - Support viewing images, media files...
- Support styled-components.
- Reload browser using web socket.
