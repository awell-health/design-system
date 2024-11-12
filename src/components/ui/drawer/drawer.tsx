import React, { ReactNode, useEffect, useState, type FC } from 'react';
import clsx from 'clsx';
import { Icon } from '../icon';

interface DrawerProps {
    isOpen?: boolean
    defaultOpen?: boolean
    onOpenChange?: (isOpen: boolean) => void
    children: ReactNode
}
export const Drawer: FC<DrawerProps> = ({ isOpen: controlledOpen, defaultOpen = false, onOpenChange, children }) => {
    const [isControlled, setIsControlled] = useState<boolean>(controlledOpen !== undefined);
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
    useEffect(() => {
        setIsControlled(controlledOpen !== undefined);
    }, [controlledOpen]);

    const handleToggle = () => {
      // If controlled, call the callback
      if (isControlled && onOpenChange) {
        onOpenChange(!isOpen);
      } else {
        // If uncontrolled, update internal state
        setUncontrolledOpen(!isOpen);
      }
    };
  return (
    <div
      className={clsx('h-full flex fixed ease-in-out duration-300 bg-red-300 right-0 top-0', {
        'w-[300px]': isOpen,
        'w-[50px]': !isOpen
      })}
    >
      <div className='w-full h-full relative'>
        <div className='w-full h-8 mb-4 bg-blue-100 relative'>
          <div className='p-4 absolute top-0 right-0 cursor-pointer' onClick={handleToggle}>
            <Icon icon={isOpen ? 'RiArrowRightLine' : 'RiArrowLeftLine'} />
          </div>
        </div>
        {
          isOpen && <div className='bg-blue-100 h-full'>{children}</div>
        }
      </div>
    </div>
  );
};
