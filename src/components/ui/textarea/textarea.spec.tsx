import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('match snapshot', () => {
    const result = render(<Textarea />);

    expect(result).toMatchSnapshot();
  });
});
