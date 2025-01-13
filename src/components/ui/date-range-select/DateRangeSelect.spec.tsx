import * as React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { DateRangeSelect } from './DateRangeSelect';

describe('DateRangeSelect', () => {
  it('match snapshot', () => {
    const { container } = render(<DateRangeSelect onSelect={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
