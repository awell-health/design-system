import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Checkbox, CheckboxProps } from './checkbox';

describe('Checkbox', () => {
  const subject = (props = {}) => {
    const defaultProps: CheckboxProps = {
      type: 'checkbox',
      label: 'Label',
      onChange: () => false
    };

    return render(<Checkbox {...defaultProps} {...props} data-testid='checkbox' />);
  };

  it('match checkbox snapshot', () => {
    const { container } = subject();
    expect(container).toMatchSnapshot();
  });

  it('match checked checkbox snapshot', () => {
    const { container } = subject({ checked: true });
    expect(container).toMatchSnapshot();
  });

  it('match radio snapshot', () => {
    const { container } = subject({ type: 'radio' });
    expect(container).toMatchSnapshot();
  });

  it('match disabled snapshot', () => {
    const { container } = subject({ disabled: true });
    expect(container).toMatchSnapshot();
  });

  it('match indeterminate snapshot', () => {
    const { container } = subject({ indeterminate: true });
    expect(container).toMatchSnapshot();
  });

  it('renders help text', () => {
    const helpText = 'Help text';
    const { getByText } = subject({ helpText });

    expect(getByText(helpText)).toBeVisible();
  });

  it('calls click handler', () => {
    const onChange = vi.fn();
    const { getByTestId } = subject({ onChange });

    fireEvent.click(getByTestId('checkbox'));

    expect(onChange).toHaveBeenCalledOnce();
  });
});
