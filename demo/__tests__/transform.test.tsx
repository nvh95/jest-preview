import { render } from '@testing-library/react';

import App from '../App';

describe('transform', () => {
  it('should generate snapshots correctly in different OS', () => {
    render(<App />);
    // TODO: To refactor this test. It frequently need to be updated.
    expect(document.body.outerHTML).toMatchInlineSnapshot(
      `"<body><div><div class=\\"App\\"><header class=\\"App-header\\"><img src=\\"/logo.svg\\" class=\\"App-logo\\" alt=\\"logo\\"><img src=\\"/demo/assets/images/logo.svg\\" class=\\"logo2\\" alt=\\"logo2\\"><p>Hello Vite + React!</p><p class=\\"_scssModule_ujx1w_1\\">Styled by SCSS Modules</p><p class=\\"sc-bczRLJ dgihId\\">This text is styled by styled-components</p><p class=\\"global-css\\">This text is styled by global css which is not imported to App.tsx</p><p class=\\"_cssModule_1gc0y_1\\">This text is styled by CSS Modules</p><p class=\\"global-configured-sass\\">This text is styled by global configured SASS</p><p class=\\"imported-sass\\">This text is styled by imported SASS</p><p class=\\"bg-yellow-400 font-bold m-5 text-red-500\\">This text is styled by Tailwind CSS</p><button class=\\"css-s689uo-App\\">Hover to change color.</button><p class=\\"css-2m18qq\\">Styled by Emotion</p><p class=\\"c-gqdJwI\\">Styled by Stiches</p><p class=\\"load-path-sass\\">This text is styled by SASS from load paths</p><p class=\\"animate__animated animate__bounce\\">An animated element style using @use ~</p><div class=\\"animated fadeIn\\"><p>An animated element style using import ~</p><p>Watch me fade in!</p></div><p><button data-testid=\\"increase\\" type=\\"button\\">count is: <div data-testid=\\"count\\">0</div></button></p><p>Edit <code>App.tsx</code> and save to test HMR updates.</p><p><a class=\\"App-link\\" href=\\"https://reactjs.org\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Learn React</a> | <a class=\\"App-link\\" href=\\"https://vitejs.dev/guide/features.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Vite Docs</a></p></header></div></div></body>"`,
    );
  });
});
