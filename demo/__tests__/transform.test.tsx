import { render } from '@testing-library/react';

import App from '../App';

describe('transform', () => {
  it('should generate snapshots correctly in different OS', () => {
    render(<App />);
    expect(document.body.outerHTML).toMatchInlineSnapshot(
      `"<body><div><div class=\\"App\\"><header class=\\"App-header\\"><img src=\\"/logo.svg\\" class=\\"App-logo\\" alt=\\"logo\\"><img src=\\"/demo/assets/images/logo.svg\\" class=\\"logo2\\" alt=\\"logo2\\"><p>Hello Vite + React!</p><p class=\\"sc-bczRLJ dgihId\\">This text is styled by styled-components</p><p class=\\"global-css\\">This text is styled by global css which is not imported to App.tsx</p><p class=\\"_cssModule_16r0j_1\\">This text is styled by CSS Modules</p><p class=\\"global-configured-sass\\">This text is styled by global configured SASS</p><p class=\\"imported-sass\\">This text is styled by imported SASS</p><button class=\\"css-s689uo-App\\">Hover to change color.</button><p class=\\"css-2m18qq\\">Styled by Emotion</p><p class=\\"c-gqdJwI\\">Styled by Stiches</p><p><button data-testid=\\"increase\\" type=\\"button\\">count is: <div data-testid=\\"count\\">0</div></button></p><p>Edit <code>App.tsx</code> and save to test HMR updates.</p><p><a class=\\"App-link\\" href=\\"https://reactjs.org\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Learn React</a> | <a class=\\"App-link\\" href=\\"https://vitejs.dev/guide/features.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Vite Docs</a></p></header></div></div></body>"`,
    );
  });
});
