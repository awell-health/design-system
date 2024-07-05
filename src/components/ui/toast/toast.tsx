import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Icon } from '../icon';

const toastVariants = cva('toast', {
  variants: {
    horizontal: {
      start: 'toast-start',
      center: 'toast-center',
      end: 'toast-end'
    },
    vertical: {
      top: 'toast-top',
      middle: 'toast-middle',
      bottom: 'toast-bottom'
    }
  },
  defaultVariants: {
    horizontal: 'center',
    vertical: 'bottom'
  }
});

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title: string;
  text?: string;
  icon?: JSX.Element;
  handleClose: () => void;
}

function Toast({ className, horizontal, vertical, handleClose, ...props }: ToastProps) {
  const { title, text, icon } = props;
  const textStyling = icon ? 'pl-4 flex items-start justify-center' : '';
  return (
    <div className={cn(toastVariants({ horizontal, vertical }), className)}>
      <div className='flex flex-col p-4 bg-white rounded-lg shadow border border-slate-200 max-w-[400px]'>
        <div className='justify-start items-center gap-4 inline-flex'>
          {icon && <div className='relative'>{icon}</div>}
          <div className='w-[400px] flex-col justify-start items-start'>
            <div className='text-slate-900 text-sm font-medium whitespace-normal overflow-auto max-w-[300px]'>
              {title}
            </div>
          </div>

          <div role='button' onClick={handleClose}>
            <Icon icon='RiCloseFill' className='fill-slate-400 w-4 h-4' />
          </div>
        </div>
        <div className={textStyling}>
          <div className='text-slate-500 text-sm whitespace-normal overflow-auto w-[300px]'>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Toast, toastVariants };
