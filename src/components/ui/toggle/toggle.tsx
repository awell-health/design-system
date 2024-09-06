import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva('toggle focus:bg-none', {
  variants: {},
  defaultVariants: {}
});

interface Props
  extends React.ButtonHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  helpText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = React.forwardRef<HTMLInputElement, Props>(
  ({ className, checked = false, disabled = false, onChange, helpText, label, ...props }, ref) => {
    return (
      <div>
        <label className='flex gap-2 cursor-pointer'>
          <input
            className={cn(
              toggleVariants({ className }),
              // @TODO: get tailwind colors from config
              '[--tglbg:#F1F5F9] hover:[--tglbg:#E2E8F0] disabled:[--tglbg:#F1F5F9]',
              checked && '[--tglbg:#2563EB] hover:[--tglbg:#2563EB]',
              'border-none bg-white hover:bg-white'
            )}
            checked={checked}
            ref={ref}
            {...props}
            disabled={disabled}
            type='checkbox'
            onChange={onChange}
          />
          <span className='label-text text-slate-700 text-sm font-medium'>{ label }</span>
        </label>
        {helpText && (
          <div className='flex gap-2'>
            <div className='w-[48px]' />
            <span className='text-slate-500 text-sm font-normal'>{helpText}</span>
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };
