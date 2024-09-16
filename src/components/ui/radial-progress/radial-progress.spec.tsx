import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { RadialProgress } from './radial-progress';

describe('RadialProgres', () => {
  it('match snapshot', () => {
    const { container } = render(
      <RadialProgress value={30}>
        <div>RadialProgress Content</div>
      </RadialProgress>
    );

    expect(container).toMatchSnapshot();
  });
});
