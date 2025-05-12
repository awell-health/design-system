import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dropdownVariants = cva('dropdown', {
  variants: {
    placement: {
      default: '',
      top: 'dropdown-top',
      left: 'dropdown-left',
      right: 'dropdown-right',
      bottom: 'dropdown-bottom'
    }
  },
  defaultVariants: {
    placement: 'default'
  }
});

export interface DropdownMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    { trigger, children, className, triggerClassName, contentClassName, placement, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(dropdownVariants({ placement, className }))} {...props}>
        <div tabIndex={0} role='button' className={cn('btn m-1', triggerClassName)}>
          {trigger}
        </div>
        <ul
          tabIndex={0}
          className={cn(
            'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52',
            contentClassName
          )}
        >
          {children}
        </ul>
      </div>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

export interface DropdownMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  className?: string;
}

const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(className)} {...props}>
        <a>{children}</a>
      </li>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props}>
        {children}
      </div>
    );
  }
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
  }
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  dropdownVariants
};
