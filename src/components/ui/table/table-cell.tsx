import { cn } from "@/lib/utils";
import * as React from "react";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  supportingText?: string;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, supportingText, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-6 py-4 justify-start items-center flex-inline",
        "text-slate-800 text-sm font-medium leading-tight text-left",
        className,
      )}
      {...props}
    >
      <span className="flex gap-1 flex-col">
        {children}
        {supportingText && <span className='text-slate-500 font-normal'>{supportingText}</span>}
      </span>
    </td>
  ),
);

export { TableCell };
