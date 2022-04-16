import path from 'path';
import fs from 'fs';
import { CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG } from './constants';

interface JestPreviewConfigOptions {
  externalCss: string[];
  sassLoadPaths: string[];
}

export function jestPreviewConfigure(
  options: JestPreviewConfigOptions = { externalCss: [], sassLoadPaths: [] },
) {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  options.externalCss.forEach((cssFile) => {
    const basename = path.basename(cssFile);

    // Avoid name collision
    // Add `global` to let `jest-preview` server that we want to cache those files
    const destinationBasename = `cache-${basename}`;
    const destinationFile = path.join(CACHE_FOLDER, destinationBasename);

    // If sass file is passed, we need to transform it to css
    if (cssFile.endsWith('.scss') || cssFile.endsWith('.sass')) {
      const sass = require('sass');

      // Create cache folder if it doesn't exist
      if (!fs.existsSync(CACHE_FOLDER)) {
        fs.mkdirSync(CACHE_FOLDER, {
          recursive: true,
        });
      }

      let sassLoadPaths: string[] = [];
      // Save sassLoadPaths to cache, so we can use it in the transformer
      if (options.sassLoadPaths) {
        sassLoadPaths = options.sassLoadPaths.map(
          (path) => `${process.cwd()}/${path}`,
        );

        fs.writeFileSync(
          path.join(CACHE_FOLDER, SASS_LOAD_PATHS_CONFIG),
          JSON.stringify(sassLoadPaths),
        );
      }

      // Transform sass to css
      const sassDestinationFile = destinationFile.replace(
        /\.(scss|sass)$/,
        '.css',
      );
      const sassFile = fs.readFileSync(cssFile, 'utf8');
      const sassResult = sass.compileString(sassFile, {
        loadPaths: sassLoadPaths,
      });
      fs.writeFileSync(sassDestinationFile, sassResult.css);
      return;
    }

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
}
