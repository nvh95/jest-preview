import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER } from './constants';

export function debug(outerHTML = document.documentElement.outerHTML): void {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    path.join(CACHE_FOLDER, 'index.html'),
    outerHTML,
  );
}
