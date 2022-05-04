import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER } from './constants';

export function debug(element: Element = document.body): void {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  const headChildrenOnly = [...document.head.children].reduce(
    (prev, current) => prev + current.outerHTML,
    '',
  );
  fs.writeFileSync(path.join(CACHE_FOLDER, 'head.html'), headChildrenOnly);
  // Always save head.html to disk before body.html, so we don't need to watch head.html
  fs.writeFileSync(path.join(CACHE_FOLDER, 'body.html'), element.outerHTML);
}
