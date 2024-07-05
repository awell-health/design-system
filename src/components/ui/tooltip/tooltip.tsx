import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tooltipVariants = cva('tooltip before:shadow before:px-3 before:py-2 before:rounded-lg', {
  variants: {
    variant: {
      default: '',
      light: 'before:bg-white before:text-slate-700 after:'
    },
    placement: {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  children: JSX.Element | string;
  datatip: JSX.Element | string;
}

function Tooltip({ datatip, className, children, variant, placement, ...props }: TooltipProps) {
  return (
    <div
      data-tip={datatip}
      className={cn(tooltipVariants({ variant, placement }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tooltip, tooltipVariants };
