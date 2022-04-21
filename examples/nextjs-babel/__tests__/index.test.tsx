import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

it('should show welcome message', () => {
  render(<Home />);

  expect(screen.getByRole('heading', { name: /welcome to nextjs/i })).toBeInTheDocument();
});
