import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { Alert } from './alert';

describe('Alert', () => {
  it('match snapshot', () => {
    const result = render(<Alert title='Alert Title' showIcon={true} />);

    expect(result).toMatchSnapshot();
  });
});
