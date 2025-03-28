import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const buttonVariants = cva('btn', {
  variants: {
    size: {
      sm: 'btn-sm rounded-md px-3.5 py-2',
      lg: 'btn-lg rounded-lg px-[18px] py-2.5 h-[46px]'
    },
    shape: {
      squareLg: 'btn-square w-[46px] h-[46px] min-h-[46px] min-w-[46px] rounded-lg',
      squareSm: 'btn-square w-8 h-8 min-w-8 min-h-8 rounded-md'
    },
    variant: {
      primary:
        'btn-primary hover:bg-blue-800 hover:border-blue-800 active:bg-blue-800 active:border-blue-800 disabled:bg-slate-200 disabled:border-slate-200 disabled:text-white',
      secondaryBlue:
        'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 active:bg-blue-100 active:border-blue-300 disabled:bg-blue-50 disabled:border-blue-200 disabled:text-blue-200 outline-blue-500',
      secondary:
        'btn-secondary bg-white border-slate-300 hover:bg-slate-100 active:bg-slate-100 disabled:text-slate-200 disabled:border-slate-200 disabled:bg-white',
      link: 'text-blue-700 text-sm bg-transparent border-none shadow-none hover:bg-transparent active:bg-transparent disabled:text-blue-200 disabled:bg-transparent outline-blue-700',
      ghost:
        'btn-ghost text-slate-600 hover:bg-slate-100 active:bg-slate-100 disabled:text-slate-200 disabled:bg-transparent outline-slate-300',
      error: 'btn-error',
      success: 'btn-success',
      warning: 'btn-warning'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm'
  }
});

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line
  ({ className, variant, size, shape, disabled = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
