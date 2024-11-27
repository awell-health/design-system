import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';

import { Drawer } from './drawer';
import React from 'react';

describe('Drawer', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      isOpen: true,
      children: <div>Drawer Content</div>,
      drawerWidth: 460,
      side: 'right' as const
    };
    return render(<Drawer {...defaultProps} {...props} />);
  };

  it('matches snapshot', () => {
    expect(subject().container).toMatchSnapshot();
  });

  it('renders with correct width', () => {
    const { container } = subject({ drawerWidth: 500 });
    const drawer = container.firstChild as HTMLElement;
    expect(drawer).toHaveStyle({ width: '500px' });
  });

  it('positions on the right by default', () => {
    const { container } = subject();
    const drawer = container.firstChild as HTMLElement;
    expect(drawer).toHaveClass('right-0');
    expect(drawer).not.toHaveClass('left-0');
  });

  it('positions on the left when specified', () => {
    const { container } = subject({ side: 'left' });
    const drawer = container.firstChild as HTMLElement;
    expect(drawer).toHaveClass('left-0');
    expect(drawer).not.toHaveClass('right-0');
  });

  it('applies correct transform class when open', () => {
    const { container } = subject({ isOpen: true });
    const slidePanel = container.querySelector('[class*="translate"]');
    expect(slidePanel).toHaveClass('translate-x-0');
    expect(slidePanel).not.toHaveClass('translate-x-full');
  });

  it('applies correct transform class when closed', () => {
    const { container } = subject({ isOpen: false });
    const slidePanel = container.querySelector('[class*="translate"]');
    expect(slidePanel).toHaveClass('translate-x-full');
    expect(slidePanel).not.toHaveClass('translate-x-0');
  });
});