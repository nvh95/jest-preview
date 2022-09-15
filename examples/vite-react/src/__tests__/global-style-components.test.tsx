import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';
import preview from 'jest-preview';

import { ServerStyleSheet } from 'styled-components';

// Workaround to support global styles for styled-components in Node environment
function renderWithGlobalStyle(ui: React.ReactElement) {
  const sheet = new ServerStyleSheet();
  render(sheet.collectStyles(ui));
  // Get the style tags manually
  const styleTags = sheet.getStyleTags();
  sheet.seal();

  // Inject it to the `document.head`
  const template = document.createElement('template');
  template.innerHTML = styleTags;
  const styledComponentsElement = template.content.firstChild;
  document.head.appendChild(styledComponentsElement as ChildNode);
}

describe('App', () => {
  it('should work as expected', () => {
    renderWithGlobalStyle(<App />);

    const styledText = screen.getByText('Global Style Components (Yellow)');
    const styles = getComputedStyle(styledText);
    expect(styles.color).toBe('yellow');

    preview.debug();
  });
});
