import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('match snapshot', () => {
    const { container } = render(<Textarea />);

    expect(container).toMatchSnapshot();
  });
});
