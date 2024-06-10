import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary:
        "btn-primary hover:bg-blue-700 hover:border-blue-700 active:bg-blue-700 active:border-blue-700 disabled:bg-slate-200 disabled:border-slate-200 disabled:text-white",
      secondaryBlue:
        "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 active:bg-blue-100 active:border-blue-300 disabled:bg-blue-50 disabled:border-blue-200 disabled:text-blue-200",
      secondary:
        "btn-secondary bg-white border-slate-300 hover:bg-slate-100 active:bg-slate-100 disabled:text-slate-200 disabled:border-slate-200 disabled:bg-white",
      link: "text-blue-600 text-sm bg-transparent border-none shadow-none hover:bg-transparent active:bg-transparent disabled:text-blue-200 disabled:bg-transparent",
      ghost:
        "btn-ghost text-slate-600 hover:bg-slate-100 active:bg-slate-100 disabled:text-slate-200 disabled:bg-transparent",
      error: "btn-error",
      success: "btn-success",
      warning: "btn-warning",
    },
    size: {
      sm: "btn-sm rounded-md px-3.5 py-2",
      lg: "btn-lg rounded-lg px-[18px] py-2.5 h-[46px]",
    },
    shape: {
      squareLg: "btn-square h-9 w-9 min-h-9 min-w-h-9 rounded-lg p-2",
      squareSm: "btn-square h-6 w-6 min-h-6 min-w-h-6 rounded-md p-1",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, disabled = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
