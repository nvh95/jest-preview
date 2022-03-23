import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import preview from '../../dist/index.es';

describe('App', () => {
  it('should work as expected', () => {
    const { container } = render(<App />);

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
