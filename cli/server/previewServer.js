#!/usr/bin/env node
const http = require('http');
const path = require('path');
const fs = require('fs');
const connect = require('connect');
const sirv = require('sirv');
const app = connect();
const { openBrowser } = require('./browser');

const { createServer: createViteServer } = require('vite');

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
    configFile: path.resolve(__dirname, './vite.config.js'),
  });

  const port = process.env.PORT || 3336;

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

  function injectToString(string, word, injectWord) {
    const breakPosition = string.indexOf(word) + word.length;
    return (
      string.slice(0, breakPosition) + injectWord + string.slice(breakPosition)
    );
  }

  function injectToHead(html, content) {
    return injectToString(html, '<head>', content);
  }

  app.use(vite.middlewares);

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

  app.use('/', async (req, res) => {
    let indexHtml = fs.readFileSync(INDEX_PATH, 'utf8');
    indexHtml = injectToHead(
      indexHtml,
      `<link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">`,
    );
    indexHtml = injectToHead(
      indexHtml,
      `<script type="module" src="/@vite/client"></script>
    <script type="module">
  import RefreshRuntime from "/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
  </script>`,
    );
    res.end(indexHtml);
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    if (fs.existsSync(INDEX_PATH)) {
      // Remove old preview
      const files = fs.readdirSync(CACHE_DIRECTORY);
      files.forEach((file) => {
        if (!file.startsWith('cache-')) {
          fs.unlinkSync(path.join(CACHE_DIRECTORY, file));
        }
      });
    }

    if (!fs.existsSync(CACHE_DIRECTORY)) {
      fs.mkdirSync(CACHE_DIRECTORY, {
        recursive: true,
      });
    }
    fs.writeFileSync(
      INDEX_PATH,
      `<!DOCTYPE html>
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
    </html>`,
    );

    console.log(`Jest Preview Server listening on port ${port}`);
    openBrowser(`http://localhost:${port}`);
  });
}

createServer();
