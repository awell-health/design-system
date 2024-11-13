import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  helpText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  // eslint-disable-next-line
  const { className, checked, disabled, helpText, label, onChange, ...rest } = props;

  return (
    <div>
      <label className='flex gap-2 cursor-pointer items-top'>
        <input
          className={cn(
            'toggle focus:bg-none',
            // @TODO: get tailwind colors from config
            '[--tglbg:#F1F5F9] hover:[--tglbg:#E2E8F0] disabled:[--tglbg:#F1F5F9]',
            checked && '[--tglbg:#2563EB] hover:[--tglbg:#2563EB]',
            'border-none bg-white hover:bg-white',
            className
          )}
          checked={checked}
          ref={ref}
          {...rest}
          disabled={disabled}
          type='checkbox'
          onChange={onChange}
        />
        <span className='label-text text-slate-700 text-sm font-medium flex flex-col gap-2'>
          {label}
          {helpText && <span className='text-slate-500 text-sm font-normal'>{helpText}</span>}
        </span>
      </label>
    </div>
  );
});

Toggle.displayName = 'Toggle';

export { Toggle };
