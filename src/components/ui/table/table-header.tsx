import { cn } from "@/lib/utils";
import * as React from "react";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-6 py-3 bg-gray-50 text-gray-500 text-xs font-medium leading-[18px] text-left",
      "hover:text-slate-700 disabled:text-gray-30",
      className,
    )}
    {...props}
  />
));

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(
    "[&_tr]:border-b", "[&_tr:first-child>th:first-child]:rounded-tl-lg", "[&_tr:first-child>th:last-child]:rounded-tr-lg", className
  )} {...props} />
));

export { TableHead, TableHeader };
