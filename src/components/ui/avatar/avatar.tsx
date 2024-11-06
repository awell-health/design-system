import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva('', {
  variants: {
    variant: {
      circle: 'rounded-full',
      square: 'rounded-md'
    },
    size: {
      xs: 'w-8',
      sm: 'w-16',
      md: 'w-20',
      lg: 'w-32'
    }
  },
  defaultVariants: {
    variant: 'circle',
    size: 'sm'
  }
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  placeholder?: boolean;
  text?: string;
}

function Avatar({
  src,
  className,
  variant,
  size,
  placeholder = false,
  text,
  ...props
}: AvatarProps) {
  return (
    <div className={cn('avatar', { placeholder: placeholder })}>
      {!placeholder && (
        <div className={cn(avatarVariants({ variant, size }), className)} {...props}>
          <img src={src} />
        </div>
      )}
      {placeholder && (
        <div
          className={cn(
            'bg-neutral text-neutral-content w-24 rounded-full',
            avatarVariants({ size }),
            className
          )}
          {...props}
        >
          <span
            className={cn({
              'text-xs': size === 'xs',
              'text-sm': size === 'sm',
              'text-xl': size === 'md',
              'text-3xl': size === 'lg'
            })}
          >
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

export { Avatar, avatarVariants };
