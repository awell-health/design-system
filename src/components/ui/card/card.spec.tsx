import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Card } from './card';

describe('Card', () => {
  it('match snapshot', () => {
    const result = render(
      <Card>
        <div>Card Content</div>
      </Card>
    );

    expect(result).toMatchSnapshot();
  });
});
