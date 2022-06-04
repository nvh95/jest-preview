import { render } from '@testing-library/react';

import App from '../App';

describe('transform', () => {
  it('should generate snapshots correctly in different OS', () => {
    render(<App />);

    expect(document.body.outerHTML).toMatchInlineSnapshot(
      `"<body><div><div class=\\"App\\"><header class=\\"App-header\\"><svg class=\\"svg-component\\">/src/logo.svg</svg><img src=\\"/src/logo.svg\\" class=\\"App-logo\\" alt=\\"logo\\"><img src=\\"/src/assets/images/logo.svg\\" class=\\"logo2\\" alt=\\"logo2\\"><p>Create React App example</p><p class=\\"_textOrange_p6ddy_1\\">Styled by CSS Modules</p><p class=\\"global-configured-sass\\">This text is styled by global configured SASS</p><p class=\\"imported-sass\\">This text is styled by imported SASS</p><p class=\\"load-path-sass\\">This text is styled by SASS from load paths</p><div class=\\"animated fadeIn\\"><p>An animated element style using @import ~</p><p>Watch me fade in!</p></div><button data-testid=\\"increase\\" type=\\"button\\">count is: <div data-testid=\\"count\\">0</div></button><a class=\\"App-link\\" href=\\"https://reactjs.org\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Learn React</a></header></div></div></body>"`,
    );
  });
});
