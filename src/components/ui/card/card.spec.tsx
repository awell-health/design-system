import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Card } from './card';

describe('Card', () => {
  it('match snapshot', () => {
    const { container } = render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });
});
