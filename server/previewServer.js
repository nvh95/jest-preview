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
const chokidar = require('chokidar');
const open = require('open');

const port = process.env.PORT || 3336;
// TODO: Can we reuse `port`, I think Vite they can do that
// https://github.com/vitejs/vite/blob/50a876537cc7b934ec5c1d11171b5ce02e3891a8/packages/vite/src/node/server/ws.ts#L97
// TODO: Increase port by 1 is not a good strategy, we should check if it's also available
const wsPort = Number(port) + 1;

// Websocket server
const { WebSocketServer } = require('ws');

const HTML_PATH = './node_modules/.cache/jest-preview-dom/index.html';

const wss = new WebSocketServer({ port: wsPort });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

const watcher = chokidar.watch(HTML_PATH, {
  // ignored: ['**/node_modules/**', '**/.git/**'],
  ignoreInitial: true,
  ignorePermissionErrors: true,
  disableGlobbing: true,
});

// TODO: Do we need to unregister?
watcher.on('change', () => {
  wss.clients.forEach((client) => {
    console.log(client);
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'reload' }));
    }
  });
});

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
  const scriptContent = fs
    .readFileSync(path.join(__dirname, './ws-client.js'), 'utf-8')
    .replace(/\$PORT/g, wsPort);
  console.log(scriptContent);
  const htmlContent = `<!DOCTYPE html>
<html>
<head>${css}</head>
<body>
  ${html}
</body>
<script>${scriptContent}</script>
</html>`;
  res.end(htmlContent);
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // TODO: Clear all file in ./node_modules/.cache/jest-preview-dom
  // TODO: To improve: to focus on opened tab instead of always open new tab
  open(`http://localhost:${port}`);
});
