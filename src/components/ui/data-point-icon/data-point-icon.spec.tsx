import { describe, expect, it } from 'vitest';

import { DataPointIcon } from './data-point-icon';
import React from 'react';
import { render } from '@testing-library/react';

describe('DataPointIcon', () => {
  it('match snapshot', () => {
    const { container } = render(<DataPointIcon dataPointValueType='string' />);

    expect(container).toMatchSnapshot();
  });

  it('should render the correct icon', () => {
    const { container } = render(<DataPointIcon dataPointValueType='attachments_array' />);

    expect(container).toMatchSnapshot();
  });
});
