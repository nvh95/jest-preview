#!/usr/bin/env node
const http = require('http');
const path = require('path');
const fs = require('fs');
const connect = require('connect');
const sirv = require('sirv');
const app = connect();
const chokidar = require('chokidar');
const { openBrowser } = require('./browser');
const { WebSocketServer } = require('ws');

const port = process.env.PORT || 3336;
// TODO: Can we reuse `port`, I think Vite they can do that
// https://github.com/vitejs/vite/blob/50a876537cc7b934ec5c1d11171b5ce02e3891a8/packages/vite/src/node/server/ws.ts#L97
// TODO: Increase port by 1 is not a good strategy, we should check if it's also available
const wsPort = Number(port) + 1;

const CACHE_DIRECTORY = './node_modules/.cache/jest-preview';
const INDEX_BASENAME = 'index.html';
const INDEX_PATH = path.join(CACHE_DIRECTORY, INDEX_BASENAME);
const PUBLIC_CONFIG_BASENAME = 'cache-public.config';
const PUBLIC_CONFIG_PATH = path.join(CACHE_DIRECTORY, PUBLIC_CONFIG_BASENAME);
const FAV_ICON_PATH = './node_modules/jest-preview/cli/server/favicon.ico';

// Always set default public folder to `public` if not specified
let publicFolder = 'public';

if (fs.existsSync(PUBLIC_CONFIG_PATH)) {
  publicFolder = fs.readFileSync(PUBLIC_CONFIG_PATH, 'utf8').trim();
}

if (fs.existsSync(INDEX_PATH)) {
  // Remove old preview
  const files = fs.readdirSync(CACHE_DIRECTORY);
  files.forEach((file) => {
    if (!file.startsWith('cache-')) {
      fs.unlinkSync(path.join(CACHE_DIRECTORY, file));
    }
  });
} else {
  fs.mkdirSync(CACHE_DIRECTORY, {
    recursive: true,
  });
}

let defaultIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
</head>
<body>
No preview found.<br/>
Please add following lines to your test: <br /> <br />
<div style="background-color: grey;width: fit-content;padding: 8px;">
  <code>
  import { debug } from 'jest-preview';
  <br />
  <br />
  // Inside your tests
  <br />
  debug();
  </code>
</div>
<br />
Then rerun your tests.
<br />
See an example in the <a href="https://www.jest-preview.com/docs/getting-started/usage#3-preview-your-html-from-jest-following-code-demo-how-to-use-it-with-react-testing-library" target="_blank" rel="noopener noreferrer">documentation</a>
</body>
</html>`;

fs.writeFileSync(INDEX_PATH, defaultIndexHtml);

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

const watcher = chokidar.watch([INDEX_PATH, PUBLIC_CONFIG_PATH], {
  // ignored: ['**/node_modules/**', '**/.git/**'],
  ignoreInitial: true,
  ignorePermissionErrors: true,
  disableGlobbing: true,
});

function handleFileChange(filePath) {
  const basename = path.basename(filePath);
  // TODO: Check if this is the root cause for issue on linux
  if (basename === INDEX_BASENAME) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ type: 'reload' }));
      }
    });
  }

  if (basename === PUBLIC_CONFIG_BASENAME) {
    publicFolder = fs.readFileSync(PUBLIC_CONFIG_PATH, 'utf8').trim();
  }
}

watcher
  .on('change', handleFileChange)
  .on('add', handleFileChange)
  .on('unlink', handleFileChange);

/**
 *
 * @param {string} string
 * @param {string} word
 * @param {string} injectWord
 * @returns string
 */

function injectToString(string, word, injectWord) {
  const breakPosition = string.indexOf(word) + word.length;
  return (
    string.slice(0, breakPosition) + injectWord + string.slice(breakPosition)
  );
}

function injectToHead(html, content) {
  return injectToString(html, '<head>', content);
}

app.use((req, res, next) => {
  // Learn from https://github.com/vitejs/vite/blob/2b7dad1ea1d78d7977e0569fcca4c585b4014e85/packages/vite/src/node/server/middlewares/static.ts#L38
  const serve = sirv('.', {
    dev: true,
    etag: true,
  });
  // Do not serve index
  if (req.url === '/') {
    return next();
  }

  // Check if req.url is existed, if not, look up in public directory
  const filePath = path.join('.', req.url);
  if (!fs.existsSync(filePath)) {
    const newPath = path.join(publicFolder, req.url);
    if (fs.existsSync(newPath)) {
      req.url = newPath;
    } else {
      // Cannot find the file, warns user about it
      // Likely user has old Jest cached code transformations.
      // Or just a bug in their source code
      console.log('[WARN] File not found: ', req.url);
      console.log(`[WARN] Please check if ${req.url} is existed.`);
      console.log(
        `[WARN] If it is existed, likely you forget to setup the code transformation, or you haven't flushed the old cache yet. Try to run "./node_modules/.bin/jest --clearCache" to clear the cache.\n`,
      );
      // TODO: To send those warning to browser as an overlay/ toast, the idea is similar to https://www.npmjs.com/package/vite-plugin-checker
      // TODO: Known issue: in development, we can't find `favicon.ico` yet. So it will yell in the Preview Server logs
    }
  }
  serve(req, res, next);
});

app.use('/', (req, res) => {
  const reloadScriptContent = fs
    .readFileSync(path.join(__dirname, './ws-client.js'), 'utf-8')
    .replace(/\$PORT/g, wsPort);
  let indexHtml = fs.readFileSync(INDEX_PATH, 'utf-8');
  indexHtml += `<script>${reloadScriptContent}</script>`;
  indexHtml = injectToHead(
    indexHtml,
    `<link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">`,
  );
  res.end(indexHtml);
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Jest Preview Server listening on port ${port}`);
  openBrowser(`http://localhost:${port}`);
});
