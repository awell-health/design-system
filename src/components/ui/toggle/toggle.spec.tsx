import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Toggle } from './toggle';

describe('Toggle', () => {
  const subject = (props = {}) =>
    render(<Toggle onChange={() => false} label='Toggle Label' data-testid='toggle' {...props} />);

  it('match snapshot', () => {
    const { container } = subject();

    expect(container).toMatchSnapshot();
  });

  it('match disabled snapshot', () => {
    const { container } = subject({ disabled: true });
    expect(container).toMatchSnapshot();
  });

  it('calls click handler', () => {
    const onChange = vi.fn();
    const { getByTestId } = subject({ onChange });

    fireEvent.click(getByTestId('toggle'));

    expect(onChange).toHaveBeenCalledOnce();
  });
});
