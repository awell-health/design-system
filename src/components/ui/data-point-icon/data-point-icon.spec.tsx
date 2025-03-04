import { describe, expect, it } from 'vitest';

import { DataPointIcon } from './data-point-icon';
import React from 'react';
import { render } from '@testing-library/react';
import { DataPointValueType } from './types';

describe('DataPointIcon', () => {
  it('match snapshot', () => {
    const { container } = render(<DataPointIcon dataPointValueType={DataPointValueType.String} />);

    expect(container).toMatchSnapshot();
  });

  it('should render the correct icon', () => {
    const { container } = render(
      <DataPointIcon dataPointValueType={DataPointValueType.AttachmentsArray} />
    );

    expect(container).toMatchSnapshot();
  });
});
