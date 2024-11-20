import * as React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('match snapshot', () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });
});
