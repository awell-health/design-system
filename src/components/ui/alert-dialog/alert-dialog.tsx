import * as React from 'react';
import { cn } from '@/lib/utils';

import { Icon } from '../icon';
import { Button } from '../button/button';

interface AlertDialogButton {
  label: string;
  buttonVariant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  buttonAction?: () => void;
  disabled?: boolean;
}

interface Props {
  title?: string;
  icon?: JSX.Element;
  text?: string;
  children?: JSX.Element | string;
  onClose?: () => void;
  button?: AlertDialogButton;
  secondaryButton?: AlertDialogButton;
  className?: string;
}

const AlertDialog = (props: Props): React.JSX.Element => {
  const { title, icon, text, button, children = null, onClose, secondaryButton, className } = props;

  return (
    <div
      className={cn('relative z-[9999]', className)}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-slate-700 bg-opacity-30 transition-opacity z-[9999]'></div>
      <div className='fixed inset-0 z-[9999] w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 bg-white rounded-lg shadow'>
            <div className='flex flex-row' style={{ gap: '20px' }}>
              {onClose && (
                <div
                  className='absolute top-0 right-0 p-4 cursor-pointer text-slate-950'
                  onClick={onClose}
                  data-testid='close-handler'
                >
                  <Icon icon='RiCloseLine' />
                </div>
              )}
              <div className='flex gap-5'>
                {icon && <div>{icon}</div>}
                <div>
                  <div className='flex flex-col'>
                    {title && (
                      <h3
                        className='text-gray-900 text-lg text-gray-900 leading-7'
                        id='modal-title'
                      >
                        {title}
                      </h3>
                    )}
                    {text && (
                      <div className='mt-2'>
                        <p className='text-gray-500 text-sm'>{text}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {children && <div>{children}</div>}
            {(button || secondaryButton) && (
              <div
                className='flex justify-end pt-[32px] gap-3 items-center'
                // FIXME: Using inline style because gap-3 is not working
                style={{ gap: '12px' }}
              >
                {secondaryButton && (
                  <Button
                    type='button'
                    variant={secondaryButton?.buttonVariant ?? 'secondary'}
                    onClick={secondaryButton?.buttonAction}
                    disabled={secondaryButton?.disabled}
                  >
                    {secondaryButton?.label}
                  </Button>
                )}
                {button && (
                  <Button
                    type='button'
                    variant={button?.buttonVariant ?? 'primary'}
                    onClick={button?.buttonAction}
                    disabled={button?.disabled}
                  >
                    {button.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlertDialog };
