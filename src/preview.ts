import fs from 'fs';
import path from 'path';
import { getStyle } from './styled-components';
import { CACHE_FOLDER } from './constants';

export function debug(element: Element = document.body): void {
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  // If user use styled-components
  if (getStyle) {
    // TODO: We can send this data via websocket instead of writing to disk
    fs.writeFileSync(
      path.join(CACHE_FOLDER, 'jp-styled-components.css'),
      getStyle(),
      {
        encoding: 'utf-8',
        flag: 'w',
      },
    );
  }

  fs.writeFileSync(path.join(CACHE_FOLDER, 'index.html'), element.outerHTML, {
    encoding: 'utf-8',
    flag: 'w',
  });
}
