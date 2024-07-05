import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Toast } from './toast';

describe('Toast', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      title: 'Toast Title',
      handleClose: vi.fn(),
      text: 'Text',
      icon: <span>Icon</span>
    };

    return render(<Toast {...defaultProps} {...props} />);
  };

  it('match snapshot', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('triggers handleClose function', () => {
    const handleClose = vi.fn();
    const { getByRole } = subject({ handleClose });

    fireEvent.click(getByRole('button'));

    expect(handleClose).toHaveBeenCalledOnce();
  });
});
