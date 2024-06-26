import { cn } from "@/lib/utils";
import * as React from "react";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-6 py-3 bg-gray-50 text-gray-500 text-xs font-medium leading-[18px] hover:text-slate-700 disabled:text-gray-30 text-left",
      className,
    )}
    {...props}
  />
));

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));

export { TableHead, TableHeader };
