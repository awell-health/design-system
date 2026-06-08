import '@testing-library/jest-dom/vitest';
import * as React from 'react';
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

    return render(
      <React.Fragment>
        <Checkbox {...defaultProps} {...props} data-testid='checkbox' />
      </React.Fragment>
    );
  };

  it('match checkbox snapshot', () => {
    const { container } = subject();
    expect(container).toMatchSnapshot();
  });

  it('match checked checkbox snapshot', () => {
    const { container } = subject({ checked: true });
    expect(container).toMatchSnapshot();
  });

  it('match large checked checkbox snapshot', () => {
    const { container } = subject({ checked: true, inputSize: 'lg' });
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

  it('uses darker disabled colors', () => {
    const { getByTestId, getByText } = subject({ disabled: true });

    expect(getByTestId('checkbox')).toHaveClass('!bg-slate-300', '!border-slate-400');
    expect(getByText('Label')).toHaveClass('text-slate-400');
  });

  it('keeps checked disabled checkboxes blue', () => {
    const { container, getByTestId } = subject({ checked: true, disabled: true });
    const icon = container.querySelector('svg');

    expect(getByTestId('checkbox')).toHaveClass('!bg-blue-50', '!border-blue-700');
    expect(icon).toHaveClass('fill-blue-700');
  });

  it('keeps checked disabled radios blue', () => {
    const { getByTestId } = subject({ checked: true, disabled: true, type: 'radio' });

    expect(getByTestId('checkbox')).toHaveClass('!bg-blue-50', '!border-blue-700');
  });

  it('uses lighter help text when disabled', () => {
    const { getByText } = subject({ disabled: true, helpText: 'Disabled help text' });

    expect(getByText('Disabled help text')).toHaveClass('text-slate-400');
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
