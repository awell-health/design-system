import { describe, expect, it } from 'vitest';

import React from 'react';
import { Spinner } from './spinner';
import { render } from '@testing-library/react';

describe('Spinner', () => {
  it('match snapshot', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });
});
