import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('loading loading-spinner text-blue-600', {
  variants: {
    variant: {
      circle: 'loading-spinner',
      dots: 'loading-dots',
      infinity: 'loading-infinity'
    },
    size: {
      xs: 'loading-xs',
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg'
    }
  },
  defaultVariants: {
    variant: 'circle',
    size: 'lg'
  }
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ size, variant, className, ...props }: Props) {
  return <span className={cn(spinnerVariants({ size, variant }), className)} {...props} />;
}

export { Spinner };
