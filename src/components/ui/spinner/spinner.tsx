import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('loading loading-spinner text-blue-600', {
  variants: {
    size: {
      xs: 'loading-xs',
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ size, className, ...props }: Props) {
  return <span className={cn(spinnerVariants({ size }), className)} {...props} />;
}

export { Spinner };
