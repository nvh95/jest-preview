const fs = require('fs');

export function preview(element: Element): void {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  // If user doesn't use styled-components, this try-catch just be silent
  try {
    import('./styled-components').then(({ getStyle }) => {
      fs.writeFileSync(
        './node_modules/.cache/jest-preview-dom/jp-styled-components.css',
        getStyle(),
        {
          encoding: 'utf-8',
          flag: 'w',
        },
      );
    });
  } catch (error) {
    // `styled-components` is not in used
  }

  fs.writeFileSync(
    './node_modules/.cache/jest-preview-dom/index.html',
    element.outerHTML,
    {
      encoding: 'utf-8',
      flag: 'w',
    },
  );
}
