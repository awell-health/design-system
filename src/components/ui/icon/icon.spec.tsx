import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Icon } from './icon';

describe('Icon', () => {
  it('match snapshot', () => {
    const result = render(<Icon icon='RiAddFill' />);

    expect(result).toMatchSnapshot();
  });
});
