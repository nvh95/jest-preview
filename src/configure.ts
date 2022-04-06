import path from 'path';
import fs from 'fs';

interface JestPreviewConfigOptions {
  externalCss: string[];
}

export function jestPreviewConfigure(
  options: JestPreviewConfigOptions = { externalCss: [] },
) {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  options.externalCss.forEach((cssFile) => {
    const basename = path.basename(cssFile);
    // Avoid name collision
    const destinationBasename = `jp-${basename}`;
    const destinationFile = path.join(
      './node_modules/.cache/jest-preview-dom',
      destinationBasename,
    );
    // TODO: To move to load file directly instead of cloning them to `.cache`
    // Move together with transform
    if (!fs.existsSync(destinationFile)) {
      fs.copyFile(cssFile, destinationFile, (err: any) => {
        if (err) throw err;
      });
    }
  });
}
