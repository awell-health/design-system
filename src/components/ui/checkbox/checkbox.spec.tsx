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
    expect(subject()).toMatchSnapshot();
  });

  it('match radio snapshot', () => {
    expect(subject({ type: 'radio' })).toMatchSnapshot();
  });

  it('match disabled snapshot', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('match indeterminate snapshot', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders help text', () => {
    const helpText = 'Help text';
    const { getByText } = subject({ helpText });

    expect(getByText(helpText)).toBeVisible();
  });
});
