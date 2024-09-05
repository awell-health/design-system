import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { Modal } from './Modal';
import React from 'react';

const handleClose = vi.fn();

vi.mock('react-use', () => ({
  useClickAway: vi.fn().mockImplementation(() => {
    handleClose();
  }),
  useKey: vi.fn().mockImplementation(() => {
    handleClose();
  })
}));

describe('Modal', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      children: 'Modal Content',
      onClose: handleClose
    };

    return render(<Modal {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('match snapshot', () => {
    expect(subject().container).toMatchSnapshot();
  });

  it('triggers handleClose function', () => {
    const children = <div onClick={handleClose}>handle close</div>;
    const { getByText } = subject({ children });

    fireEvent.click(getByText('handle close'));

    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('triggers handleClose on Escape key press', () => {
    const children = <div onClick={handleClose}>handle close</div>;
    const { container } = subject({ children, closeOnEscape: true });

    fireEvent.keyDown(container, 'Escape');

    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('triggers handleClose on click away', () => {
    const children = 'Test';
    const { getByRole } = subject({ children, clickOutside: true });

    fireEvent.click(getByRole('dialog'));

    expect(handleClose).toHaveBeenCalledOnce();
  });
});
