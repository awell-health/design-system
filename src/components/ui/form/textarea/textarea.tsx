import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | JSX.Element | React.ReactElement;
  helpText?: string;
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, helpText, hasError = false, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1.5'>
        {label && <span className='text-slate-600 text-sm font-medium'>{label}</span>}
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            hasError && 'border-red-300',
            className
          )}
          ref={ref}
          {...props}
        />
        {helpText && (
          <span className={cn('text-slate-500 text-sm font-normal', hasError && 'text-red-500')}>
            {helpText}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
