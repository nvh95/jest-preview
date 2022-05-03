import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import { debug } from '../../dist/index';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    // Execute `preview.debug()` or `debug()` to see the UI in a browser
    debug();

    // Jest Preview automatically preview failed tests without explicitly calling `debug()`
    // Try to comment out the following line to see the count equals to 6
    userEvent.click(screen.getByTestId('increase'));

    expect(screen.getByTestId('count')).toContainHTML('7');
  });
});
