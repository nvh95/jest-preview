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
const { openBrowser } = require('./browser');
// Websocket server
const { WebSocketServer } = require('ws');

let publicFolder = '';

const port = process.env.PORT || 3336;
// TODO: Can we reuse `port`, I think Vite they can do that
// https://github.com/vitejs/vite/blob/50a876537cc7b934ec5c1d11171b5ce02e3891a8/packages/vite/src/node/server/ws.ts#L97
// TODO: Increase port by 1 is not a good strategy, we should check if it's also available
const wsPort = Number(port) + 1;

const CACHE_DIRECTORY = './node_modules/.cache/jest-preview-dom';
const HTML_PATH = path.join(CACHE_DIRECTORY, 'index.html');
const FAV_ICON_PATH = './node_modules/jest-preview/server/favicon.ico';

const wss = new WebSocketServer({ port: wsPort });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    try {
      const dataJSON = JSON.parse(data);
      if (dataJSON.type === 'publicFolder') {
        publicFolder = dataJSON.payload;
      }
    } catch (error) {
      console.error(error);
    }
  });
});

const watcher = chokidar.watch(HTML_PATH, {
  // ignored: ['**/node_modules/**', '**/.git/**'],
  ignoreInitial: true,
  ignorePermissionErrors: true,
  disableGlobbing: true,
});

function handleFileChange() {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'reload' }));
    }
  });
}
setInterval(() => {
  console.log(wss.clients.size);
  // wss.clients.forEach((ws) => {
  //   console.log(Object.keys(ws));
  // });
}, 1000);
// TODO: Do we need to unregister?
watcher
  .on('change', handleFileChange)
  .on('add', handleFileChange)
  .on('unlink', handleFileChange);
console.log('__dirname', __dirname);

app.use((req, res, next) => {
  // Learn from https://github.com/vitejs/vite/blob/2b7dad1ea1d78d7977e0569fcca4c585b4014e85/packages/vite/src/node/server/middlewares/static.ts#L38
  const serve = sirv('.', {
    dev: true,
    etag: true,
  });
  // Do not serve index
  // console.log('req.url', req.url);
  if (req.url === '/') {
    return next();
  }

  // TODO: Check if req.url is existed, if not, look up in public directory
  const filePath = path.join('.', req.url);
  // console.log('filePath', filePath);
  if (!fs.existsSync(filePath)) {
    console.log(req.url, 'not found. Try to find in public folder.');
    req.url = path.join(publicFolder, req.url);
    console.log('publicFolder', publicFolder);
    console.log('req.url', req.url);
  }
  serve(req, res, next);
});

app.use('/', (req, res) => {
  const reloadScriptContent = fs
    .readFileSync(path.join(__dirname, './ws-client.js'), 'utf-8')
    .replace(/\$PORT/g, wsPort);

  if (!fs.existsSync(HTML_PATH)) {
    // Make it looks nice
    return res.end(`<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
</head>
<body>
No preview found.<br/>
Please run: <br /> <br />
<code>
preview.debug();
</code>
<br /><br />
</body>
<script>${reloadScriptContent}</script>
</html>`);
  }
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  // TODO2: How do we preserve the order of importing css file?
  // For now I think it's not very important, but this is the room for improvement in next versions
  let css = '';
  // TODO: Do not need to construct css from files, since we can construct it from memory (client sends css files' location via websocket event)
  const allFiles = fs.readdirSync('./node_modules/.cache/jest-preview-dom');
  allFiles.forEach((file) => {
    if (file.endsWith('.css')) {
      css += `\n<style>${fs.readFileSync(
        `./node_modules/.cache/jest-preview-dom/${path.basename(file)}`,
        'utf8',
      )}</style>`;
    }
  });

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
${css}
</head>
<body>
  ${html}
</body>
<script>${reloadScriptContent}</script>
</html>`;
  res.end(htmlContent);
});

const server = http.createServer(app);

server.listen(port, () => {
  if (fs.existsSync(HTML_PATH)) {
    // Remove old preview
    const files = fs.readdirSync(CACHE_DIRECTORY);
    files.forEach((file) => {
      if (!file.startsWith('cache-')) {
        fs.unlinkSync(path.join(CACHE_DIRECTORY, file));
      }
    });
  }

  console.log(`Example app listening on port ${port}`);
  openBrowser(`http://localhost:${port}`);
});
