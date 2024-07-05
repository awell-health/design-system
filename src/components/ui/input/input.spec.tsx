import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Input } from './input';
import { Icon } from '../icon';

describe('', () => {
  it('match snapshot', () => {
    const props = {
      label: 'Label',
      helpText: 'Help text',
      prefixIcon: <Icon icon='RiAddFill' />,
      suffixIcon: <Icon icon='RiArrowLeftLine' />
    };
    const result = render(<Input {...props} />);

    expect(result).toMatchSnapshot();
  });

  it('displays error', () => {
    const value = 'test input value';
    const { getByDisplayValue } = render(<Input hasError={true} value={value} />);

    expect(getByDisplayValue(value)).toHaveClass('border-red-500');
  });
});
