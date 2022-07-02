import { render, fireEvent, screen } from '@testing-library/svelte';
import { debug } from 'jest-preview';
import App from './App.svelte';

describe('Counter Component', () => {
  it('it changes count when button is clicked', async () => {
    render(App);
    const button = screen.getByText(/Clicks:/);
    expect(button.innerHTML).toBe('Clicks: 0');
    await fireEvent.click(button);
    await fireEvent.click(button);
    await fireEvent.click(button);
    await fireEvent.click(button);

    expect(button.innerHTML).toBe('Clicks: 4');

    debug();
  });
});
