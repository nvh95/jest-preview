import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

interface JestPreviewConfigOptions {
  externalCss?: string[];
  publicFolder?: string;
}

let socket = null as WebSocket | null;
const wsPort = Number(process.env.PORT || 3336) + 1;
export async function jestPreviewConfigure(
  options: JestPreviewConfigOptions = { externalCss: [] },
) {
  console.log('jestPreviewConfigure', jestPreviewConfigure);
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  options.externalCss?.forEach((cssFile) => {
    const basename = path.basename(cssFile);
    // Avoid name collision
    // Add `global` to let `jest-preview` server that we want to cache those files
    const destinationBasename = `cache-${basename}`;
    const destinationFile = path.join(
      './node_modules/.cache/jest-preview-dom',
      destinationBasename,
    );
    // TODO: To move to load file directly instead of cloning them to `.cache`
    // Move together with transform
    // TODO: To cache those files. We cannot cache them by checking if files exists
    // Since content of the files might changes and it won't be copied over
    // Can we send a websocket event to preview server and let server remember location of the files in the memory?
    // That way, we can don't have to copy files to disk
    // Memory is faster than disk anyway!!!!
    // if (!fs.existsSync(destinationFile)) {
    fs.copyFile(cssFile, destinationFile, (err: any) => {
      if (err) throw err;
    });
    // }
  });

  if (options.publicFolder) {
    // If socket connection is not initiated, or is closing or closed, we need to connect
    console.log('socket before', socket, socket?.readyState);
    if (!socket || socket.readyState === 2 || socket.readyState === 3) {
      // This does not work. Since somehow, socket connection is async, and Jest kills the socket connection
      // It means that we couldn't write async logic here yet
      // I'm not sure if we are able to do that
      socket = new WebSocket(`ws://localhost:${wsPort}`);
      await new Promise((resolve) => {
        console.log('inside promise');
        setTimeout(() => {
          console.log('timeouted');
          resolve(1);
        }, 1 * 1000);
      });
      console.log('oops');
      console.log('init socket', socket.readyState);
      socket?.send(
        JSON.stringify({
          type: 'publicFolder',
          payload: options.publicFolder,
        }),
      );
      socket.onopen = () => {
        console.log('Send publicFolder event to preview server');
        socket?.send(
          JSON.stringify({
            type: 'publicFolder',
            payload: options.publicFolder,
          }),
        );
      };
      socket.onerror = () => {
        console.warn(
          chalk.yellow(
            'Jest Preview server is not running. Please run `jest-preview` to see snapshots in the browser.',
          ),
        );
      };
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 1 * 1000);
    });
  }
}
