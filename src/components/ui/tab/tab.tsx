import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { TabItem } from './types';

const tabVariants = cva('tabs border-slate-200', {
  variants: {
    variant: {
      default: [
        'flex p-1 bg-slate-100 rounded-lg border items-center gap-2',
        '[&_.tab]:rounded-md',
        '[&_.tab-active]:text-slate-700 [&_.tab-active]:bg-white [&_.tab-active]:shadow'
      ].join(' '),
      bordered: [
        'flex px-1 items-start border-b gap-4',
        '[&_.tab-active]:text-blue-700 [&_.tab-active]:!border-blue-700 [&_.tab-active]:border-b'
      ].join(' ')
    },
    size: {
      sm: '',
      md: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm'
  }
});

interface TabProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabVariants> {
  items: TabItem[];
  fullWidth?: boolean;
  selected?: string;
  // New props for link support
  linkComponent?: React.ComponentType<any>;
  preserveClientSideNavigation?: boolean;
}

function Tab({ 
  className, 
  items, 
  selected, 
  variant, 
  size, 
  fullWidth = true, 
  linkComponent: LinkComponent,
  preserveClientSideNavigation = false,
  ...props 
}: TabProps) {
  
  const renderItem = (item: TabItem): JSX.Element => {
    const { id, label, onClick, className: tabClassName, href, target, disabled } = item;

    // Common styling for both buttons and links
    const commonClasses = cn(
      'tab flex text-slate-500',
      selected === id && 'tab-active',
      fullWidth && 'grow shrink',
      variant === 'default' && size === 'md' && 'h-11 px-3.5 py-2.5 text-base',
      variant === 'default' && size === 'sm' && 'h-8 px-3 py-2 text-xs',
      variant === 'bordered' && size === 'md' && 'px-1 pb-4 h-[42px] text-base',
      variant === 'bordered' && size === 'sm' && 'px-1 pb-4 h-[34px] text-xs',
      disabled && 'opacity-50 cursor-not-allowed',
      tabClassName
    );

    // Helper function to handle click events with hybrid navigation support
    const handleClick = (event: React.MouseEvent) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      // For hybrid navigation (both href and onClick)
      if (href && onClick) {
        // Let browser handle right-click, ctrl+click, middle-click naturally
        if (event.button === 2 || event.ctrlKey || event.metaKey || event.button === 1) {
          return; // Let browser handle
        }
        
        // For normal left-click, use onClick for client-side navigation
        if (preserveClientSideNavigation) {
          event.preventDefault();
        }
        onClick(item);
        return;
      }

      // For onClick-only tabs
      if (onClick) {
        onClick(item);
        return;
      }
    };

    // Render as link when href is provided
    if (href) {
      const linkProps = {
        href,
        target,
        role: 'tab' as const,
        className: commonClasses,
        onClick: handleClick,
        onContextMenu: undefined, // Allow right-click context menu
        children: label
      };

      // Use custom LinkComponent if provided (e.g., Next.js Link, React Router Link)
      if (LinkComponent) {
        return <LinkComponent key={id} {...linkProps} />;
      }

      // Use native anchor tag
      return <a key={id} {...linkProps} />;
    }

    // Render as anchor for onClick-only tabs (maintaining backward compatibility)
    // Note: This maintains the original HTML structure even though semantically
    // a button would be more appropriate for click-only interactions
    return (
      <a
        key={id}
        role="tab"
        className={commonClasses}
        onClick={handleClick}
        style={disabled ? { pointerEvents: 'none' } : undefined}
      >
        {label}
      </a>
    );
  };

  return (
    <div role='tablist' className={cn(tabVariants({ variant }), className)} {...props}>
      {items.map(renderItem)}
    </div>
  );
}

export { Tab };
