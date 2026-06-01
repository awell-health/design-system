'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  useDialogContext
} from '../dialog/dialog';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SheetProps extends React.ComponentPropsWithoutRef<typeof Dialog> {}

const Sheet = React.forwardRef<HTMLDialogElement, SheetProps>(({ className, ...props }, ref) => (
  <Dialog ref={ref} className={cn('items-stretch justify-center p-0', className)} {...props} />
));
Sheet.displayName = 'Sheet';

const sheetContentVariants = cva('relative w-full bg-white shadow-lg border border-slate-200', {
  variants: {
    side: {
      right: 'ml-auto h-full',
      left: 'mr-auto h-full',
      top: 'self-start max-h-[90vh]',
      bottom: 'self-end max-h-[90vh]'
    },
    size: {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-lg',
      xl: 'sm:max-w-xl',
      full: 'sm:max-w-full'
    }
  },
  defaultVariants: {
    side: 'right',
    size: 'md'
  }
});

interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetContentVariants> {}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side, size, onClick, ...props }, ref) => {
    const { open } = useDialogContext('SheetContent');

    return (
      <div
        ref={ref}
        role='document'
        data-state={open ? 'open' : 'closed'}
        className={cn(sheetContentVariants({ side, size }), className)}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
      />
    );
  }
);
SheetContent.displayName = 'SheetContent';

const SheetTrigger = DialogTrigger;
const SheetClose = DialogClose;
const SheetHeader = DialogHeader;
const SheetFooter = DialogFooter;
const SheetTitle = DialogTitle;
const SheetDescription = DialogDescription;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
};
