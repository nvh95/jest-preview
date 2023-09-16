import React from 'react';
import {render} from '@testing-library/react';

import Index from '../pages/index';
import {debug} from "./test-utils";

// if you want to debug even if the test does not fail, set this to true
const useDebug = false;

describe('Index', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Index/>);

    if (useDebug) {
        debug();
    }

    // change this to false and this will automatically update, thanks to autoPreview feature
    expect(baseElement).toEqual(true);
  });
});
