import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER } from './constants';
import { createCacheFolder } from './utils';

interface DebugOptions {
  cacheFolder?: string;
}

export function debug({ cacheFolder = CACHE_FOLDER }: DebugOptions = {}): void {
  createCacheFolder(cacheFolder);

  fs.writeFileSync(
    path.join(cacheFolder, 'index.html'),
    document.documentElement.outerHTML,
  );
}
