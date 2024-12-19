import React, { ReactNode, type FC, type RefObject } from 'react';
import { useClickAway, useKey } from 'react-use';
import { cn } from '../../../lib/utils';

interface Props {
  onClose: () => void;
  clickOutside?: boolean;
  closeOnEscape?: boolean;
  children: JSX.Element | ReactNode | string;
  className?: string;
  marginTop?: string;
}

const Modal: FC<Props> = (props) => {
  const {
    children,
    onClose,
    clickOutside = false,
    closeOnEscape = false,
    className = '',
    marginTop = 'mt-[100px]'
  } = props;
  const modalRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  if (clickOutside) {
    useClickAway(modalRef, onClose);
  }

  if (closeOnEscape) {
    useKey('Escape', onClose);
  }

  return (
    <div
      className='relative z-[9999]'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-slate-700 bg-opacity-30 transition-opacity z-[9999]'></div>
      <div className='fixed inset-0 z-[9999] w-screen overflow-y-auto'>
        <div className={cn('flex justify-center p-4', marginTop)}>
          <div className='relative transform overflow-hidden transition-all bg-white rounded-lg shadow border border-slate-200'>
            <div ref={modalRef} className={cn('w-[1024px] h-[500px]', className)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
