import { describe, expect, it } from 'vitest';

import { Badge } from './badge';
import React from 'react';
import { render } from '@testing-library/react';

describe('Badge', () => {
  it('match snapshot', () => {
    const { container } = render(<Badge />);

    expect(container).toMatchSnapshot();
  });
});
