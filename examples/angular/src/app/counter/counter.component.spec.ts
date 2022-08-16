import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
// import preview from 'jest-preview';
import { CounterComponent } from './counter.component';
import './counter.component.css';

describe(CounterComponent.name, () => {
  it('should work as expected', async () => {
    const user = userEvent.setup();
    await render(CounterComponent);

    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    // preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('6');
  });
});
