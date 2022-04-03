#!/usr/bin/env node
// We can move this file to globalSetup, globalTeardown
// Reference:
// - https://jestjs.io/docs/puppeteer
// - https://jestjs.io/docs/configuration#globalsetup-string
// No, we can't. Since jest will terminate the express server after test finish running

const http = require('http');
const path = require('path');
const fs = require('fs');
const connect = require('connect');
const sirv = require('sirv');
const app = connect();

const port = process.env.PORT || 3336;

app.use((req, res, next) => {
  // Learn from https://github.com/vitejs/vite/blob/2b7dad1ea1d78d7977e0569fcca4c585b4014e85/packages/vite/src/node/server/middlewares/static.ts#L38
  const serve = sirv('./node_modules/.cache/jest-preview-dom', {
    dev: true,
    etag: true,
  });
  // Do not serve index
  if (req.url === '/') {
    return next();
  }
  serve(req, res, next);
});

app.use('/', (req, res) => {
  const HTML_PATH = './node_modules/.cache/jest-preview-dom/index.html';
  if (!fs.existsSync(HTML_PATH)) {
    // Make it looks nice
    return res.send(`
    No preview found.<br/>
    Please run: <br /> <br />
    <code>
    const { container } = render(<App />);<br/>
    preview(container);
    </code>
    <br /><br />
    then revisit this page.
    `);
  }
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  // TODO2: How do we preserve the order of importing css file?
  // For now I think it's not very important, but this is the room for improvement in next versions
  // TODO3: not support styled-components. Might refer to jest-styled-components
  // Target for version > 0.0.1
  let css = '';
  const allFiles = fs.readdirSync('./node_modules/.cache/jest-preview-dom');
  allFiles.forEach((file) => {
    if (file.endsWith('.css')) {
      css += `\n<style>${fs.readFileSync(
        `./node_modules/.cache/jest-preview-dom/${path.basename(file)}`,
        'utf8',
      )}</style>`;
    }
  });
  const content = `
    ${css}
    ${html}
  `;
  res.end(content);
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // TODO: Clear all file in ./node_modules/.cache/jest-preview-dom
});
