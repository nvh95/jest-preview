import { render, screen } from '@testing-library/react';

import App from '../App';

describe('File', () => {
  it('should render file correctly in JSDOM', () => {
    render(<App />);
    expect((screen.getByAltText('logo') as HTMLImageElement).src).toContain(
      '/logo.svg',
    );
    expect((screen.getByAltText('logo2') as HTMLImageElement).src).toContain(
      '/demo/assets/images/logo.svg',
    );
  });
});
