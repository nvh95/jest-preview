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
  // TODO: We actually do not need to write the file, since it's already in `document.head`.
  // Just try to inject document.head, beside document.body and we can remove following code.
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

  // TODO: To write header to header.html
  // To convert body to body.html
  // chokidar needs to watch both head and body
  // CSS Modules and sass should append css to head, instead of body

  fs.writeFileSync(path.join(CACHE_FOLDER, 'index.html'), element.outerHTML, {
    encoding: 'utf-8',
    flag: 'w',
  });
}
