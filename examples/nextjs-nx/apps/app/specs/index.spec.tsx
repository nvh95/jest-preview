import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';
import preview from "jest-preview";

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);

    preview.debug();

    expect(baseElement).toBeTruthy();
  });
});
