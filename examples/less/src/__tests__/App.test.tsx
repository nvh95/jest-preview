import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    render(<App />, {
      container: document.body.appendChild(root),
    });
    console.log(document.body.outerHTML);
    await userEvent.click(screen.getByTestId('increase'));
    await userEvent.click(screen.getByTestId('increase'));
    await userEvent.click(screen.getByTestId('increase'));
    await userEvent.click(screen.getByTestId('increase'));
    await userEvent.click(screen.getByTestId('increase'));
    await userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('6');
  });
});
