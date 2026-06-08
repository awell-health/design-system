'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  bodyMaxHeight?: React.CSSProperties['maxHeight'];
  className?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ bodyMaxHeight, className, style, ...props }, ref) => {
    const hasScrollableBody = bodyMaxHeight !== undefined && bodyMaxHeight !== null;
    const tableStyle = hasScrollableBody
      ? ({
          ...style,
          '--table-body-max-height':
            typeof bodyMaxHeight === 'number' ? `${bodyMaxHeight}px` : bodyMaxHeight
        } as React.CSSProperties)
      : style;

    return (
      <div
        className={cn(
          'relative w-full rounded-lg border border-slate-200 flex-col overflow-visible',
          hasScrollableBody && 'overflow-hidden'
        )}
      >
        <table
          ref={ref}
          style={tableStyle}
          className={cn(
            'w-full caption-bottom text-sm table-fixed',
            hasScrollableBody && [
              '[&_thead]:block',
              '[&_thead_tr]:table [&_thead_tr]:w-full [&_thead_tr]:table-fixed',
              '[&_tbody]:block [&_tbody]:max-h-[var(--table-body-max-height)] [&_tbody]:overflow-y-auto',
              '[&_tbody]:[scrollbar-gutter:stable]',
              '[&_tbody_tr]:table [&_tbody_tr]:w-full [&_tbody_tr]:table-fixed'
            ],
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

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
