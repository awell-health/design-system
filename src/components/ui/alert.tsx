import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "./icon";

const alertVariants = cva("alert p-4 rounded-lg border gap-3", {
  variants: {
    variant: {
      default: "bg-slate-50 border-slate-300 text-slate-600 [&h3]:text-slate-700",
      primary: "bg-blue-50 border-blue-300 text-blue-600 [&h3]:text-blue-700",
      warning: "bg-yellow-50 border-yellow-300 text-yellow-600 [&h3]:text-yellow-700",
      error: "bg-red-50 border-red-300 text-red-600 [&h3]:text-red-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title: string;
  showIcon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, Props>(
  ({ className, variant, title, children, showIcon = false, ...props }, ref) => {
    const icon = variant === 'error' || variant === 'warning' ? 'RiAlertLine' : 'RiInformationLine'
    const iconClassNames = cn({
      'fill-slate-500': variant === 'default',
      'fill-blue-500': variant === 'primary',
      'fill-yellow-500': variant === 'warning',
      'fill-red-500': variant === 'error'
    })

    return (
      <div
        role="alert"
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex self-start pt-[5px]">
          {showIcon && <Icon icon={icon} size={16} className={iconClassNames} />}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          {children && <div className="font-normal leading-tight text-xs">{children}</div>}
        </div>
      </div>
    )
  }
);

export { Alert };
