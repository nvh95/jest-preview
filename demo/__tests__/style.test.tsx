import { render } from '@testing-library/react';

import App from '../App';

function getDocumentHTML() {
  return document.documentElement.outerHTML.replace(/\r\n|\n|\r/g, '\n');
}

describe('Style', () => {
  it('should render CSS correctly in JSDOM', () => {
    render(<App />);
    // console.log(document.documentElement.outerHTML);
    // vanilla CSS
    // Global CSS
    // TODO: Global CSS is saved into the `.cache` folder, so we can't assert it directly within the JSDOM
    // Imported CSS
    expect(getDocumentHTML()).toContain(
      `.App {
  text-align: center;
}`,
    );
    expect(getDocumentHTML()).toContain(
      `.logo2 {
  max-width: 300px;
  background: yellow;
}`,
    );

    // styled-components
    expect(getDocumentHTML()).toContain(
      '<style data-styled="active" data-styled-version="6.1.19">',
    );
    expect(getDocumentHTML()).toContain('.bhPHpK{color:red;}');

    // TODO: new version of emotion has speedy mode, which inject css using
    // insertRule, which does not shown in document.documentElement.outerHTML
    // Need to get them out and inject into document.documentElement.outerHTML
    // // emotion
    // expect(getDocumentHTML()).toContain(
    //   '<style data-emotion="css" data-s="">.css-2m18qq{color:orange;}</style>',
    // );

    // CSS Modules
    // Global
    // TODO: not implemented yet
    // Import
    expect(getDocumentHTML()).toContain(
      `._cssModule_1a0qn_1 {
  color: green;
}`,
    );

    // Sass
    // Global
    // TODO: Global SCSS is saved into the `.cache` folder, not in the JSDOM, need to find a way to test it
    // Import
    expect(getDocumentHTML()).toContain(`header .imported-sass {
  text-transform: uppercase;
}`);
    expect(getDocumentHTML()).toContain(`header .imported-sass {
  color: pink;
}`);
    // import ~
    // TODO: Not implemented yet
    // loadPaths
    // TODO: Not implemented yet
  });
});
