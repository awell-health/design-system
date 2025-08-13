import * as React from 'react';

import { cn } from '@/lib/utils';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <div className='relative w-full rounded-lg border border-slate-200 flex-col overflow-hidden'>
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm table-fixed', className)}
      {...props}
    />
  </div>
));

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      '[&_tr:last-child]:border-0',
      '[&_tr:last-child>td:first-child]:rounded-bl-lg',
      '[&_tr:last-child>td:last-child]:rounded-br-lg',
      className
    )}
    {...props}
  />
));

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('border-t border-slate-200', className)} {...props} />
));

Table.displayName = 'Table';
TableBody.displayName = 'TableBody';
TableCaption.displayName = 'TableCaption';

export { Table, TableBody, TableCaption };
