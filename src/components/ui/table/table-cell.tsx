import { cn } from "@/lib/utils";
import * as React from "react";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-6 py-4 justify-start items-center flex-inline",
      "text-slate-800 text-sm font-medium leading-tight text-left",
      "[&>span]:text-slate-500 [&>span]:font-normal",
      className,
    )}
    {...props}
  />
));

export { TableCell }
