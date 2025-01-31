import * as React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { DateRangeSelect } from './DateRangeSelect';

describe('DateRangeSelect', () => {
  it('match snapshot', () => {
    const { container } = render(
      <DateRangeSelect
        onSelect={() => {}}
        defaultDateRange={{ from: '2025-01-13T10:00:00.000Z', to: '2025-02-20T10:00:00.000Z' }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with default values', () => {
    const { getByDisplayValue } = render(<DateRangeSelect onSelect={() => {}} />);

    const input = getByDisplayValue('Select Dates');
    expect(input).toBeInTheDocument();
  });

  it('should render with values from props', () => {
    const { getByDisplayValue } = render(
      <DateRangeSelect
        onSelect={() => {}}
        defaultDateRange={{
          from: '2025-01-13T10:00:00.000Z',
          to: '2025-02-20T10:00:00.000Z'
        }}
      />
    );

    const input = getByDisplayValue('13 Jan, 2025 - 20 Feb, 2025');
    expect(input).toBeInTheDocument();
  });
});
