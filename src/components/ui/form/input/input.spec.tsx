import { render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Input } from './input';
import { Icon } from '@/components/ui/icon';

describe('Input', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      label: 'Label',
      helpText: 'Help text',
      prefixIcon: <Icon icon='RiAddFill' />,
      suffixIcon: <Icon icon='RiArrowLeftLine' />,
      onChange: vi.fn()
    };

    return render(<Input {...defaultProps} {...props} />);
  };
  it('match snapshot', () => {
    expect(subject().container).toMatchSnapshot();
  });

  it('displays error', () => {
    const value = 'test input value';
    const { getByDisplayValue } = subject({ hasError: true, value });

    expect(getByDisplayValue(value)).toHaveClass('border-red-500');
  });
});
