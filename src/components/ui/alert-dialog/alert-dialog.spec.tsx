import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';

import { AlertDialog } from './alert-dialog';

describe('Alert Dialog', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      title: 'title',
      icon: <span>icon</span>,
      text: 'text',
      children: <span>children</span>
    };

    return render(<AlertDialog {...defaultProps} {...props} />);
  };

  it('match snapshot', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('handles onClose', () => {
    const onCloseMock = vi.fn();
    const { getByTestId } = render(<AlertDialog onClose={onCloseMock} />);

    fireEvent.click(getByTestId('close-handler'));

    expect(onCloseMock).toHaveBeenCalledOnce();
  });
});
