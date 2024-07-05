import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('match snapshot', () => {
    const result = render(<Badge />);

    expect(result).toMatchSnapshot();
  });
});
