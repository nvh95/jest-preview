import fs from 'fs';

export function debug(element: Element = document.body): void {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  import('./styled-components').then(({ getStyle }) => {
    // If user use styled-components
    if (getStyle) {
      // TODO: We can send this data via websocket instead of writing to disk
      fs.writeFileSync(
        './node_modules/.cache/jest-preview-dom/jp-styled-components.css',
        getStyle(),
        {
          encoding: 'utf-8',
          flag: 'w',
        },
      );
    }
  });

  fs.writeFileSync(
    './node_modules/.cache/jest-preview-dom/index.html',
    element.outerHTML,
    {
      encoding: 'utf-8',
      flag: 'w',
    },
  );
}
