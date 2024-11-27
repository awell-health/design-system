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

  it('has correct classes when open', () => {
    const { container } = subject({ isOpen: true });
    const drawer = container.firstChild as HTMLElement;
    expect(drawer).toHaveClass('translate-x-0');
    expect(drawer).toHaveClass('shadow-lg');
    expect(drawer).not.toHaveClass('translate-x-full');
    expect(drawer).not.toHaveClass('shadow-none');
  });

  it('has correct classes when closed', () => {
    const { container } = subject({ isOpen: false });
    const drawer = container.firstChild as HTMLElement;
    expect(drawer).toHaveClass('translate-x-full');
    expect(drawer).toHaveClass('shadow-none');
    expect(drawer).not.toHaveClass('translate-x-0');
    expect(drawer).not.toHaveClass('shadow-lg');
  });

  it('has transition classes', () => {
    const { container } = subject();
    const drawer = container.firstChild as HTMLElement;
    expect(drawer).toHaveClass('transition-all');
    expect(drawer).toHaveClass('duration-300');
    expect(drawer).toHaveClass('ease-in-out');
  });
});