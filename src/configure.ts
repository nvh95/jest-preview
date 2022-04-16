import path from 'path';
import fs from 'fs';

const CACHE_FOLDER = './node_modules/.cache/jest-preview-dom';

interface JestPreviewConfigOptions {
  externalCss?: string[];
  publicFolder?: string;
}

export async function jestPreviewConfigure(
  options: JestPreviewConfigOptions = {
    externalCss: [],
    publicFolder: 'public',
  },
) {
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
    if (!fs.existsSync(CACHE_FOLDER)) {
      fs.mkdirSync(CACHE_FOLDER, {
        recursive: true,
      });
    }
    fs.writeFileSync(
      path.join(CACHE_FOLDER, 'cache-public.config'),
      options.publicFolder,
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
  }
}
