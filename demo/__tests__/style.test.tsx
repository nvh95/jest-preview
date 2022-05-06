import { render } from '@testing-library/react';

import App from '../App';

describe('Style', () => {
  it('should render CSS correctly in JSDOM', () => {
    render(<App />);
    // vanilla CSS
    // Global CSS
    // TODO: Global CSS is saved into the `.cache` folder, so we can't assert it directly within the JSDOM
    // Imported CSS
    expect(document.documentElement.outerHTML).toContain(
      '<link rel="stylesheet" href="/demo/App.css">',
    );
    expect(document.documentElement.outerHTML).toContain(
      '<link rel="stylesheet" href="/demo/assets/css/App.css">',
    );

    // styled-components
    expect(document.documentElement.outerHTML).toContain(
      '<style data-styled="active" data-styled-version="5.3.5">.dgihId{color:red;}</style>',
    );

    // CSS Modules
    // Global
    // TODO: not implemented yet
    // Import
    expect(document.documentElement.outerHTML)
      .toContain(`<style type=\"text/css\">._cssModule_16r0j_1 {
  color: green;
}
</style>`);

    // Sass
    // Global
    // TODO: Global SCSS is saved into the `.cache` folder, not in the JSDOM, need to find a way to test it
    // Import
    expect(document.documentElement.outerHTML)
      .toContain(`header .imported-sass {
  text-transform: uppercase;
}`);
    expect(document.documentElement.outerHTML)
      .toContain(`header .imported-sass {
  color: pink;
}</style><style type="text/css">._cssModule_16r0j_1 {
  color: green;
}`);
    // import ~
    // TODO: Not implemented yet
    // loadPaths
    // TODO: Not implemented yet

    // Can see images
    expect(document.documentElement.outerHTML).toContain(
      `<img src="/logo.svg" class="App-logo" alt="logo">`,
    );
    expect(document.documentElement.outerHTML).toContain(
      `<img src="/demo/assets/images/logo.svg" class="logo2" alt="logo2">`,
    );
  });
});
