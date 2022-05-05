import { render, screen } from '@testing-library/react'
import { debug } from 'jest-preview';
import Index from '../routes/index'
import '@testing-library/jest-dom' // So we can use toBeInTheDocument assertion

it('should show welcome message', () => {
  render(<Index />);

  debug(); // Remove this line if you have enabled autoPreview in jest.setup.js

  expect(screen.getByRole('heading', { name: /welcome to remix/i })).toBeInTheDocument();
});
