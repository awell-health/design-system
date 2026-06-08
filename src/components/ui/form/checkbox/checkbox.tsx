'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Icon, IconSize } from '../../icon';

const checkboxVariants = cva('', {
  variants: {
    inputSize: {
      lg: 'w-6 h-6',
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
  const iconSize = inputSize === 'lg' ? IconSize.s : IconSize.xs;
  const radioDotSizeClass =
    inputSize === 'lg' ? 'w-2.5 h-2.5' : inputSize === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5';
  const isSelected = checked || indeterminate;

  return (
    <div className='flex flex-col'>
      <label className='flex items-center gap-2 cursor-pointer'>
        <span className={cn(checkboxVariants({ inputSize }), 'relative flex-shrink-0')}>
          {type === 'checkbox' && (
            <>
              {checked && (
                <Icon
                  icon='RiCheckFill'
                  className={cn(
                    'fill-white z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
                    disabled && 'fill-blue-700'
                  )}
                  size={iconSize}
                />
              )}
              {indeterminate && !checked && (
                <Icon
                  icon='RiSubtractFill'
                  className='fill-white z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
                  size={iconSize}
                />
              )}
            </>
          )}
          {type === 'radio' && checked && (
            <div
              className={cn(
                'bg-blue-700 rounded-full absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
                radioDotSizeClass
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
              disabled && 'cursor-not-allowed',
              disabled && !isSelected && '!bg-slate-300 !border-slate-400',
              disabled && isSelected && '!border-blue-700',
              'checked:border-blue-700',
              type === 'checkbox' &&
                'checked:bg-blue-700 indeterminate:bg-blue-700 indeterminate:border-blue-700',
              type === 'checkbox' && disabled && isSelected && '!bg-blue-50',
              type === 'radio' && 'rounded-full hover:bg-blue-50 checked:bg-blue-50',
              type === 'radio' && disabled && isSelected && '!bg-blue-50',
              className
            )}
            onChange={onChange}
            ref={inputRef}
            disabled={disabled}
            checked={checked}
            {...props}
          />
        </span>
        {label && (
          <span
            className={cn(
              'text-slate-700 text-sm font-medium leading-tight',
              disabled && 'text-slate-400'
            )}
          >
            {label}
          </span>
        )}
      </label>
      {helpText && (
        <div className='flex gap-2'>
          <div className={cn(checkboxVariants({ inputSize }), 'flex-shrink-0')} />
          <span className={cn('text-slate-500 text-sm font-normal', disabled && 'text-slate-400')}>
            {helpText}
          </span>
        </div>
      )}
    </div>
  );
};

export { Checkbox };
