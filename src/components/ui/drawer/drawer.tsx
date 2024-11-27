import { ReactNode, type FC } from 'react';
import clsx from 'clsx';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean
    children: ReactNode
    drawerWidth?: number
    side?: 'left' | 'right'
}


export const Drawer: FC<DrawerProps> = ({ isOpen, children, drawerWidth = 460, side = 'right', className }) => {

    return (
      <div className={
        clsx(
          'absolute top-0 h-full',
          side === 'left' ? 'left-0' : 'right-0',
          className
        )
      }
      style={{ width: `${drawerWidth}px` }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              'absolute h-full w-full top-0',
              side === 'left' ? 'left-0' : 'right-0',
              'bg-white',
              'transition-transform duration-300 ease-in-out',
              {
                'translate-x-0': isOpen && side === 'right',
                'translate-x-full': !isOpen && side === 'right',
                '-translate-x-0': isOpen && side === 'left',
                '-translate-x-full': !isOpen && side === 'left',
              }
            )}
          >
            <div className='w-full h-full relative'>
              <div className='h-full'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
};
