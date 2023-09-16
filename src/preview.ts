import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER } from './constants';

interface DebugOptions {
  cacheFolder?: string;
}

export function debug({ cacheFolder = CACHE_FOLDER }: DebugOptions = {}): void {
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    path.join(cacheFolder, 'index.html'),
    document.documentElement.outerHTML,
  );
}
