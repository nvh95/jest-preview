# How Jest Preview Works

## Components

- Jest Preview Server
- External Browser
- Jest process

## How Jest Preview's components interact

<!-- TODO: Rename jest-preview-dom => jest-preview -->

- Jest process snapshots the app, save html file to `node_modules/.cache/jest-preview`.
- Jest Preview Server serve the html file to the browser.
- If html file changes, Jest Preview Server will send a websocket event to browser to trigger reloading.

## How to display images and CSS

### Images and CSS imported to components

- [Code transformation](https://jestjs.io/docs/code-transformation)
- File transformation: Serve source file directly
- CSS transformation:
  - CSS Modules
  - styled-components
  - Sass
  - Vanilla CSS

### Global images and CSS

- Via `jestPreviewConfigure`.
