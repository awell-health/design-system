'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Tooltip } from './tooltip';

const toolbarButtonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-checked:bg-accent aria-checked:text-accent-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: 'default',
      variant: 'default'
    },
    variants: {
      size: {
        default: 'h-9 min-w-9 px-2',
        lg: 'h-10 min-w-10 px-2.5',
        sm: 'h-8 min-w-8 px-1.5'
      },
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
      }
    }
  }
);

const dropdownArrowVariants = cva(
  'inline-flex items-center justify-center rounded-r-md text-sm font-medium text-foreground transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default'
    },
    variants: {
      size: {
        default: 'h-9 w-6',
        lg: 'h-10 w-8',
        sm: 'h-8 w-4'
      },
      variant: {
        default:
          'bg-transparent hover:bg-muted hover:text-muted-foreground aria-checked:bg-accent aria-checked:text-accent-foreground',
        outline:
          'border border-l-0 border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
      }
    }
  }
);

export function Toolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('relative flex items-center select-none', className)} {...props} />;
}

export function ToolbarGroup({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center', className)} {...props}>
      {children}
    </div>
  );
}

export interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toolbarButtonVariants> {
  isDropdown?: boolean;
  pressed?: boolean;
  tooltip?: React.ReactNode;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, className, isDropdown, pressed, size = 'sm', variant, tooltip, ...props }, ref) => {
    const button = (
      <button
        ref={ref}
        className={cn(
          toolbarButtonVariants({
            size,
            variant
          }),
          isDropdown && 'justify-between gap-1 pr-1',
          pressed && 'bg-accent text-accent-foreground',
          className
        )}
        {...props}
      >
        {isDropdown ? (
          <>
            <div className='flex flex-1 items-center gap-2 whitespace-nowrap'>{children}</div>
            <div>
              <Icon icon='RiArrowDownSLine' className='size-3.5 text-muted-foreground' data-icon />
            </div>
          </>
        ) : (
          children
        )}
      </button>
    );

    if (tooltip) {
      return <Tooltip content={String(tooltip)}>{button}</Tooltip>;
    }

    return button;
  }
);
ToolbarButton.displayName = 'ToolbarButton';

export function ToolbarSplitButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <ToolbarButton
      className={cn('group flex gap-0 px-0 hover:bg-transparent', className)}
      {...props}
    />
  );
}

export function ToolbarSplitButtonPrimary({
  children,
  className,
  size = 'sm',
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof toolbarButtonVariants>) {
  return (
    <span
      className={cn(
        toolbarButtonVariants({
          size,
          variant
        }),
        'rounded-r-none',
        'group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function ToolbarSplitButtonSecondary({
  className,
  size,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof dropdownArrowVariants>) {
  return (
    <span
      className={cn(
        dropdownArrowVariants({
          size,
          variant
        }),
        'group-data-[pressed=true]:bg-accent group-data-[pressed=true]:text-accent-foreground',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      role='button'
      {...props}
    >
      <Icon icon='RiArrowDownSLine' className='size-3.5 text-muted-foreground' data-icon />
    </span>
  );
}

export function ToolbarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-2 my-1 w-px shrink-0 bg-border', className)} {...props} />;
}

export interface ToolbarMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function ToolbarMenuGroup({ children, className, label, ...props }: ToolbarMenuGroupProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      {label && (
        <div className='px-2 py-1.5 text-sm font-semibold text-muted-foreground select-none'>
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
