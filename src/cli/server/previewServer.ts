import path from 'path';
import fs from 'fs';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { openBrowser } from './browser';

const port = process.env.PORT || 3336;
const CACHE_DIRECTORY = './node_modules/.cache/jest-preview';
const INDEX_BASENAME = 'index.html';
const INDEX_PATH = path.join(CACHE_DIRECTORY, INDEX_BASENAME);
const PUBLIC_CONFIG_BASENAME = 'cache-public.config';
const PUBLIC_CONFIG_PATH = path.join(CACHE_DIRECTORY, PUBLIC_CONFIG_BASENAME);
const FAV_ICON_PATH = './node_modules/jest-preview/dist/cli/favicon.ico';

// Always set default public folder to `public` if not specified
let publicFolder = 'public';

if (fs.existsSync(PUBLIC_CONFIG_PATH)) {
  publicFolder = fs.readFileSync(PUBLIC_CONFIG_PATH, 'utf8').trim();
}

// Initialize cache directory and default HTML if needed
if (fs.existsSync(INDEX_PATH)) {
  // Remove old preview files (keeping configuration files)
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

const defaultIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">
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

const HEAD_INJECT = `<link rel="shortcut icon" href="${FAV_ICON_PATH}">
  <title>Jest Preview Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">`;

function injectIntoHead(html: string, content: string): string {
  const tag = '<head>';
  const idx = html.indexOf(tag);
  if (idx === -1) return html;
  const after = idx + tag.length;
  return html.slice(0, after) + content + html.slice(after);
}

export async function createServer() {
  const app = express();

  const vite = await createViteServer({
    // Prevent loading the user's vite.config.js, which may have plugins
    // (React, SVG loaders, etc.) that interfere with the preview server.
    configFile: false,
    server: {
      middlewareMode: true,
    },
    plugins: [
      {
        name: 'watch-jest-preview-cache',
        configureServer: (server) => {
          server.watcher.add(INDEX_PATH);
          server.watcher.add(PUBLIC_CONFIG_PATH);

          function handleFileEvent(filePath: string) {
            const basename = path.basename(filePath);
            if (basename === INDEX_BASENAME) {
              server.ws.send({ type: 'full-reload' });
            }
            if (basename === PUBLIC_CONFIG_BASENAME) {
              publicFolder = fs.readFileSync(PUBLIC_CONFIG_PATH, 'utf8').trim();
            }
          }

          server.watcher.on('change', handleFileEvent);
          server.watcher.on('add', handleFileEvent);
          server.watcher.on('unlink', handleFileEvent);
        },
      },
    ],
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use((req, res, next) => {
    if (req.path === '/') {
      return next();
    }

    const filePath = path.join('.', req.path);
    if (!fs.existsSync(filePath)) {
      const publicPath = path.join(publicFolder, req.path);
      if (fs.existsSync(publicPath)) {
        return res.sendFile(path.resolve(publicPath));
      } else {
        console.log('[WARN] File not found: ', req.path);
        console.log(`[WARN] Please check if ${req.path} exists.`);
        console.log(
          `[WARN] If it exists, likely you forget to setup the code transformation, or you haven't flushed the old cache yet. Try to run "./node_modules/.bin/jest --clearCache" to clear the cache.\n`,
        );
      }
    }

    next();
  });

  app.use('/', async (req, res) => {
    try {
      let html = fs.readFileSync(INDEX_PATH, 'utf-8');
      html = injectIntoHead(html, HEAD_INJECT);
      html = await vite.transformIndexHtml(req.originalUrl, html);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      console.error(e);
      res.status(500).end((e as Error).message);
    }
  });

  const server = app.listen(port, () => {
    console.log(`Jest Preview Server listening on http://localhost:${port}`);
    openBrowser(`http://localhost:${port}`);
  });

  return { app, vite, server };
}

// Start the server
createServer().catch((e) => {
  console.error('Error starting Jest Preview server:', e);
  process.exit(1);
});
