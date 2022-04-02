const fs = require('fs');

export function preview(element: Element): void {
  if (!fs.existsSync('./node_modules/.cache/jest-preview-dom')) {
    fs.mkdirSync('./node_modules/.cache/jest-preview-dom', {
      recursive: true,
    });
  }

  fs.writeFileSync(
    './node_modules/.cache/jest-preview-dom/cssinjs.css',
    getStyle(),
    {
      encoding: 'utf-8',
      flag: 'w',
    },
  );

  fs.writeFileSync(
    './node_modules/.cache/jest-preview-dom/index.html',
    element.outerHTML,
    {
      encoding: 'utf-8',
      flag: 'w',
    },
  );
}

// Reference: https://github.dev/styled-components/jest-styled-components/blob/4b07fde2607516db407a6215d17dfb461b90b491/src/utils.js#L38
// TODO: Just a Proof of Concept. To refactor
const { ServerStyleSheet, __PRIVATE__ } = require('styled-components');

if (!__PRIVATE__) {
  throw new Error('Could neither find styled-components secret internals');
}

const { mainSheet, masterSheet } = __PRIVATE__;

const sheet = mainSheet || masterSheet;
const isServer = () => typeof document === 'undefined';

const getHTML = () =>
  isServer() ? new ServerStyleSheet().getStyleTags() : sheet.toString();

const extract = (regex) => {
  let style = '';
  let matches;

  while ((matches = regex.exec(getHTML())) !== null) {
    style += `${matches[1]} `;
  }

  return style.trim();
};

export const getStyle = () => extract(/^(?!data-styled\.g\d+.*?\n)(.*)?\n/gm);
