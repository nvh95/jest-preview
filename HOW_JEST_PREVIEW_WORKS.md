# How Jest Preview Works

## How it works ELI5

Jest Preview turns JSDOM to a real DOM and user can see it on a browser. It saved the HTML from JSDOM and serve over a web server (with a web socket connection). It also uses [Jest Tranformations](https://jestjs.io/docs/code-transformation) to handle CSS and files (e.g: images).

## Components

- Jest Preview Server: when you run `jest-preview` (`server/previewServer.js`)
- External Browser (Jest Preview Dashboard): e.g: Chrome
- Jest process: `jest`

## How Jest Preview's components interact

- In **Jest process**, whenever `preview.debug()` is triggerd or a test fails in [Automatic Mode](https://www.jest-preview.com/blog/automatic-mode), a html file is saved to `node_modules/.cache/jest-preview`.
- **Jest Preview Server** serve that html file to the **External Browser**.
- If that html file changes, **Jest Preview Server** will send a websocket event to **External Browser** to trigger reloading for newest UI.

## How to display images and CSS

Usually, images and CSS are dropped when testing in Jest. In opposite, Jest Preview tries to keep images and CSS in the Jest tests (JSDOM).

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
