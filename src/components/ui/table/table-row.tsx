import { cn } from "@/lib/utils";
import * as React from "react";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-slate-100 hover:bg-slate-50",
      className
    )}
    {...props}
  />
))

export { TableRow }