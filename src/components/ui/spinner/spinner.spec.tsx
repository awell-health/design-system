import { describe, expect, it } from 'vitest';

import React from 'react';
import { Spinner } from './spinner';
import { render } from '@testing-library/react';

describe('Spinner', () => {
  it('match circle snapshot', () => {
    const { container } = render(<Spinner variant={'circle'} />);

    expect(container).toMatchSnapshot();
  });

  it('match dots snapshot', () => {
    const { container } = render(<Spinner variant={'dots'} />);

    expect(container).toMatchSnapshot();
  });
});
