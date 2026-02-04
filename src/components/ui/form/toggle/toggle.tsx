import * as React from 'react';
import { cn } from '../../../../lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  helpText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  variant?: 'default' | 'positive';
  toggleSize?: 'xs' | 'sm' | 'md' | 'lg';
}

const Toggle = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    checked,
    disabled,
    helpText,
    label,
    onChange,
    labelClassName,
    variant,
    toggleSize,
    ...rest
  } = props;

  const labelId = React.useId();

  return (
    <div>
      <div className='flex gap-2 items-top'>
        <input
          className={cn(
            'toggle focus:bg-none cursor-pointer',
            'border-none bg-white hover:bg-white',
            // check styles from globals.css for colors
            variant === 'positive' && 'green',
            toggleSize === 'xs' && 'toggle-xs',
            toggleSize === 'sm' && 'toggle-sm',
            toggleSize === 'md' && 'toggle-md',
            toggleSize === 'lg' && 'toggle-lg',
            className
          )}
          checked={checked}
          ref={ref}
          {...rest}
          disabled={disabled}
          type='checkbox'
          onChange={onChange}
          aria-labelledby={labelId}
        />
        <span
          id={labelId}
          className={cn(
            'label-text text-slate-700 text-sm font-medium flex flex-col gap-2',
            labelClassName
          )}
        >
          {label}
          {helpText && <span className='text-slate-500'>{helpText}</span>}
        </span>
      </div>
    </div>
  );
});

Toggle.displayName = 'Toggle';

export { Toggle };
