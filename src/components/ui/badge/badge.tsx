import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'badge rounded-2xl inline-flex items-center justify-center overflow-hidden max-w-full min-w-0',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-800 border-slate-100',
        primary: 'bg-blue-100 text-blue-800 border-blue-100',
        error: 'bg-red-100 text-red-800 border-red-100',
        warning: 'bg-orange-100 text-orange-800 border-orange-100',
        success: 'bg-green-100 text-green-800 border-green-100',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-100',
        lime: 'bg-lime-100 text-lime-800 border-lime-100',
        cyan: 'bg-cyan-100 text-cyan-800 border-cyan-100',
        teal: 'bg-teal-100 text-teal-800 border-teal-100',
        violet: 'bg-violet-100 text-violet-800 border-violet-100',
        pink: 'bg-pink-100 text-pink-800 border-pink-100'
      },
      size: {
        sm: 'badge-sm p-2 text-xs',
        lg: 'badge-lg p-3 text-sm'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      <span className='flex gap-1 truncate px-1'>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
