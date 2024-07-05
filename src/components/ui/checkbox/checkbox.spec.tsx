import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Checkbox, CheckboxProps } from './checkbox';

describe('Checkbox', () => {
  const subject = (props = {}) => {
    const defaultProps: CheckboxProps = {
      type: 'checkbox',
      label: 'Label'
    };

    return render(<Checkbox {...defaultProps} {...props} />);
  };

  it('match checkbox snapshot', () => {
    const { container } = subject();
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
});
