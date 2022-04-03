// Credit to styled-components
// Reference: https://github.com/styled-components/jest-styled-components/blob/4b07fde2607516db407a6215d17dfb461b90b491/src/utils.js#L38

const { ServerStyleSheet, __PRIVATE__ } = require('styled-components');

if (!__PRIVATE__) {
  throw new Error('Could neither find styled-components secret internals');
}

const { mainSheet, masterSheet } = __PRIVATE__;

const sheet = mainSheet || masterSheet;
const isServer = () => typeof document === 'undefined';

const getHTML = () =>
  isServer() ? new ServerStyleSheet().getStyleTags() : sheet.toString();

const extract = (regex: RegExp) => {
  let style = '';
  let matches;

  while ((matches = regex.exec(getHTML())) !== null) {
    style += `${matches[1]} `;
  }

  return style.trim();
};

export const getStyle = () => extract(/^(?!data-styled\.g\d+.*?\n)(.*)?\n/gm);
