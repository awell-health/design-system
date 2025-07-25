import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Icon, IconSize } from '../../icon';

const checkboxVariants = cva('', {
  variants: {
    inputSize: {
      md: 'w-5 h-5',
      sm: 'w-4 h-4'
    }
  },
  defaultVariants: {
    inputSize: 'sm'
  }
});

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  helpText?: string;
  type: 'radio' | 'checkbox';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  disabled,
  helpText,
  indeterminate = false,
  inputSize,
  checked = false,
  onChange,
  type,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  const boxShadowClass: string = 'shadow-[0px_0px_0px_2px_rgb(219,234,254)]';

  return (
    <div className='flex flex-col'>
      <label className='flex items-center gap-2 cursor-pointer relative'>
        {type === 'checkbox' && (
          <>
            {checked && (
              <Icon
                icon='RiCheckFill'
                className={cn(
                  'fill-white z-10 absolute',
                  inputSize === 'md' ? 'left-[2px] top-[2px]' : 'left-0 top-0'
                )}
                size={IconSize.xs}
              />
            )}
            {indeterminate && !checked && (
              <Icon
                icon='RiSubtractFill'
                className={cn(
                  'fill-white z-10 absolute',
                  inputSize === 'md' ? 'left-[2px] top-[2px]' : 'left-0 top-0'
                )}
                size={IconSize.xs}
              />
            )}
          </>
        )}
        {type === 'radio' && checked && (
          <div
            className={cn(
              'bg-blue-700 rounded-full absolute z-10',
              inputSize === 'md' ? 'w-2 h-2 left-[6px] top-[6px]' : 'w-1.5 h-1.5 left-[5px]'
            )}
          />
        )}
        <input
          type={type}
          className={cn(
            'appearance-none cursor-pointer',
            checkboxVariants({ inputSize }),
            'relative bg-white border border-slate-300 rounded outline-none',
            'flex items-center justify-center',
            !checked && 'hover:bg-blue-50 hover:border-blue-800',
            checked && 'hover:border-blue-800',
            `active:border-blue-300 active:${boxShadowClass}`,
            `focus:border-blue-300 focus:${boxShadowClass}`,
            'disabled:!bg-slate-100 disabled:!border-slate-200',
            'checked:border-blue-700',
            type === 'checkbox' &&
              'checked:bg-blue-700 indeterminate:bg-blue-700 indeterminate:border-blue-700',
            type === 'radio' && 'rounded-full hover:bg-blue-50 checked:bg-blue-50',
            className
          )}
          onChange={onChange}
          ref={inputRef}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        {label && (
          <span
            className={cn(
              'text-slate-700 text-sm font-medium leading-tight',
              disabled && 'text-slate-300'
            )}
          >
            {label}
          </span>
        )}
      </label>
      {helpText && (
        <div className='flex gap-2'>
          <div className={cn(checkboxVariants({ inputSize }), 'flex-shrink-0')} />
          <span className='text-slate-500 text-sm font-normal'>{helpText}</span>
        </div>
      )}
    </div>
  );
};

export { Checkbox };
