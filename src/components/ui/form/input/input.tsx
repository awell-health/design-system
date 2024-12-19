import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  suffixIcon?: JSX.Element;
  prefixIcon?: JSX.Element;
  hasError?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  type?: string;
  labelClassName?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helpText,
      suffixIcon,
      prefixIcon,
      hasError,
      onChange,
      type = 'text',
      labelClassName,
      ...props
    },
    ref
  ) => {
    const renderIcon = (icon: JSX.Element, position: 'left' | 'right') => {
      return (
        <span
          className={cn(
            'absolute h-[40px] flex items-center',
            position === 'left' && 'left-2.5',
            position === 'right' && 'right-2.5'
          )}
        >
          {React.cloneElement(icon, {
            size: '16',
            className: hasError ? 'fill-red-600' : 'fill-slate-500'
          })}
        </span>
      );
    };

    return (
      <div className=''>
        {label && (
          <div className={cn('label', labelClassName)}>
            <span className=' label-text text-slate-600 text-sm font-medium'>{label}</span>
          </div>
        )}
        <label className='form-control w-full flex relative'>
          {prefixIcon && renderIcon(prefixIcon, 'left')}
          <input
            type={type}
            className={cn(
              type !== 'file' && 'px-3.5 py-2.5',
              'h-[38px] min-h-[38px] rounded-lg gap-2 w-full border-box',
              'text-sm font-normal',
              'shadow border border-slate-300 text-black placeholder:text-slate-400',
              'focus:outline-0 focus:border focus:border-blue-500',
              'disabled:bg-slate-50 disabled:text-slate-300',
              prefixIcon && 'pl-8',
              suffixIcon && 'pr-8',
              hasError && 'border-red-500 focus:border-red-500',
              type === 'file' && 'file-input file-input-bordered file-input-primary',
              className
            )}
            onChange={onChange}
            ref={ref}
            {...props}
          />
          {suffixIcon && renderIcon(suffixIcon, 'right')}
        </label>
        {helpText && (
          <div className='label'>
            <span
              className={cn(
                'label-text-alt text-slate-500 text-xs font-normal',
                hasError && 'text-red-600'
              )}
            >
              {helpText}
            </span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
