import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full rounded-lg border border-slate-200 flex-col">
    <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
  </div>
));

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      "[&_tr:last-child>td:first-child]:rounded-bl-lg",
      "[&_tr:last-child>td:last-child]:rounded-br-lg",
      className
    )}
    {...props}
  />
));

export { Table, TableBody };
