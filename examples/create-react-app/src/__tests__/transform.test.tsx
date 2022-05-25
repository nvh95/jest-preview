import { render } from '@testing-library/react';

import App from '../App';

describe('transform', () => {
  it('should generate snapshots correctly in different OS', () => {
    render(<App />);

    expect(document.body.outerHTML).toMatchInlineSnapshot(
      `"<body><div><div class=\\"App\\"><header class=\\"App-header\\"><svg class=\\"svg-component\\">/src/logo.svg</svg><img src=\\"/src/logo.svg\\" class=\\"App-logo\\" alt=\\"logo\\"><img src=\\"/src/assets/images/logo.svg\\" class=\\"logo2\\" alt=\\"logo2\\"><p>Create React App example</p><p class=\\"_textOrange_1gpw2_1\\">Styled by CSS Modules</p><button data-testid=\\"increase\\" type=\\"button\\">count is: <div data-testid=\\"count\\">0</div></button><a class=\\"App-link\\" href=\\"https://reactjs.org\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Learn React</a></header></div></div></body>"`,
    );
  });
});
