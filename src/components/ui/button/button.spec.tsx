import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('match snapshot', () => {
    const result = render(<Button>Label</Button>);

    expect(result).toMatchSnapshot();
  });
});
