import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('match snapshot', () => {
    const result = render(
      <Tooltip datatip='Tooltip displayed text' data-testid='tooltip'>
        <span>Tooltip child</span>
      </Tooltip>
    );
    expect(result).toMatchSnapshot();
  });
});
