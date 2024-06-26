import { cn } from "@/lib/utils";
import * as React from "react";
import { Icon } from "../icon";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b",
      "[&_tr:first-child>th:first-child]:rounded-tl-lg",
      "[&_tr:first-child>th:last-child]:rounded-tr-lg",
      className,
    )}
    {...props}
  />
));

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  info?: JSX.Element;
  sort?: "asc" | "desc";
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, info, sort, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-6 py-3 bg-gray-50 text-gray-500 text-xs font-medium leading-[18px] text-left group",
        "hover:text-slate-700",
        sort && 'cursor-pointer',
        className,
      )}
      {...props}
    >
      <span className='flex gap-1'>
      {children}{" "}
      {info && (
        <Icon
          icon="RiQuestionLine"
          size={16}
          className="fill-gray-500 group-hover:fill-slate-700"
        />
      )}
      {sort && (
        <Icon
          icon={sort === 'asc' ? 'RiArrowUpLine' : 'RiArrowUpLine'}
          size={16}
          className="fill-gray-500 group-hover:fill-slate-700"
        />
      )}
      </span>
    </th>
  ),
);

export { TableHead, TableHeader };
