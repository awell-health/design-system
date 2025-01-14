import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('match snapshot', () => {
    const { container } = render(
      <Tooltip datatip='Tooltip displayed text' data-testid='tooltip' id='tooltip-id'>
        <span>Tooltip child</span>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });
});
