import { ReactNode, type FC } from 'react';
import clsx from 'clsx';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean
    children: ReactNode
    size: 'sm' | 'md' | 'lg'
    side?: 'left' | 'right'
}


export const Drawer: FC<DrawerProps> = ({ isOpen, children, size = 'md', side = 'right', className }) => {

  return (
    <div
      className={clsx(
        {
          'w-[300px]': size === 'sm',
          'w-[460px]': size === 'md',
          'w-[600px]': size === 'lg',
        },
        'absolute top-0 h-full bg-white',
        'transition-all duration-300 ease-in-out',
        side === 'left' ? 'left-0' : 'right-0',
        {
          'shadow-none': !isOpen,
          'shadow-lg': isOpen,
        },
        {
          'translate-x-0': isOpen && side === 'right',
          'translate-x-full': !isOpen && side === 'right',
          '-translate-x-0': isOpen && side === 'left',
          '-translate-x-full': !isOpen && side === 'left',
        },
        className
      )}
    >
      {children}
    </div>
  );
};
