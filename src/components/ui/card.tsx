import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-xl border shadow p-3', className)} {...props}>
    {children}
  </div>
));
Card.displayName = 'Card';

export { Card };
