import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tooltip as TooltipReact } from 'react-tooltip';

import { cn } from '@/lib/utils';

const tooltipVariants = cva('tooltip before:shadow before:px-3 before:py-2 before:rounded-lg', {
  variants: {
    variant: {
      default: '',
      light: 'before:bg-white before:text-slate-700 after:'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: JSX.Element | string;
  datatip: JSX.Element | string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  id?: string;
  positionStrategy?: 'fixed' | 'absolute';
  float?: boolean;
}

function Tooltip({
  datatip,
  className,
  children,
  variant,
  placement,
  id,
  positionStrategy,
  float
}: TooltipProps) {
  const tooltipId = id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        'data-tooltip-id': tooltipId
      } as Partial<typeof child.props>);
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}
      <TooltipReact
        id={tooltipId}
        place={placement}
        className={cn(tooltipVariants({ variant }), className)}
        positionStrategy={positionStrategy}
        float={float}
      >
        <div className={cn('max-w-xs break-words [word-break:normal]', className)}>{datatip}</div>
      </TooltipReact>
    </>
  );
}

export { Tooltip, tooltipVariants };
