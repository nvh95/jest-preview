import { render, screen } from '@testing-library/react'
import preview from 'jest-preview';
import Home from '../pages/index'
import '@testing-library/jest-dom'

it('should show welcome message', () => {
  render(<Home />);

  preview.debug();

  expect(screen.getByRole('heading', { name: /welcome to next.js/i })).toBeInTheDocument();
});
