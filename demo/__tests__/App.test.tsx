import { render, screen } from '@testing-library/react';

import { prettyDOM } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import preview from '../../dist/index.es';

describe('App', () => {
  it('should work as expected', () => {
    const { container } = render(<App />);
    console.log(
      prettyDOM(container, 100, {
        escapeString: false,
        highlight: false,
      }),
    );

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` before
    preview(container);

    expect(screen.getByTestId('count')).toContainHTML('6');
  });
});
