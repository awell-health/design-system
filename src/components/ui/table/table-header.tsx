import { cn } from '@/lib/utils';
import * as React from 'react';
import { Icon } from '../icon';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:border-b',
      '[&_tr:first-child>th:first-child]:rounded-tl-lg',
      '[&_tr:first-child>th:last-child]:rounded-tr-lg',
      className
    )}
    {...props}
  />
));

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  info?: JSX.Element;
  sortable?: boolean;
  order?: 'asc' | 'desc' | undefined;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, info, sortable, order, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-6 py-3 bg-gray-50 text-slate-500 text-sm font-medium leading-[18px] text-left group',
        'whitespace-normal break-words align-top',
        'hover:text-slate-700',
        sortable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      <span className='flex gap-1 break-all w-full'>
        {children}{' '}
        {info && (
          <Icon
            icon='RiQuestionLine'
            size={16}
            className='fill-gray-500 group-hover:fill-slate-700'
          />
        )}
        {order && (
          <Icon
            icon={order === 'asc' ? 'RiArrowUpLine' : 'RiArrowDownLine'}
            size={16}
            className='fill-gray-500 group-hover:fill-slate-700'
          />
        )}
      </span>
    </th>
  )
);

TableHead.displayName = 'TableHead';
TableHeader.displayName = 'TableHeader';

export { TableHead, TableHeader };
