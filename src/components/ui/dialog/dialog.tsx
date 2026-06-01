import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id?: string) => void;
  setDescriptionId: (id?: string) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = (component: string) => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used within a Dialog`);
  }
  return context;
};

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = open !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const [titleId, setTitleId] = React.useState<string | undefined>(undefined);
    const [descriptionId, setDescriptionId] = React.useState<string | undefined>(undefined);
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    React.useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    const openState = isControlled ? (open as boolean) : uncontrolledOpen;

    const setOpen = React.useCallback(
      (nextOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isControlled, onOpenChange]
    );

    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (openState) {
        if (!dialog.open) {
          if (typeof dialog.showModal === 'function') {
            dialog.showModal();
          } else {
            dialog.setAttribute('open', '');
          }
        }
      } else if (dialog.open) {
        dialog.close();
      }
    }, [openState]);

    return (
      <DialogContext.Provider
        value={{
          open: openState,
          setOpen,
          titleId,
          descriptionId,
          setTitleId,
          setDescriptionId
        }}
      >
        <dialog
          ref={dialogRef}
          aria-modal='true'
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          data-state={openState ? 'open' : 'closed'}
          className={cn(
            'fixed inset-0 z-50 m-0 flex items-start justify-center bg-black/50 p-6 sm:p-8',
            'border-0 overflow-y-auto',
            className
          )}
          onClick={(event) => {
            if (!closeOnOutsideClick) return;
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
          onCancel={(event) => {
            if (!closeOnEscape) {
              event.preventDefault();
            }
          }}
          onClose={() => {
            if (openState) {
              setOpen(false);
            }
          }}
          {...props}
        >
          {children}
        </dialog>
      </DialogContext.Provider>
    );
  }
);
Dialog.displayName = 'Dialog';

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
  const { setOpen } = useDialogContext('DialogTrigger');
  return (
    <button
      ref={ref}
      type='button'
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      {...props}
    />
  );
});
DialogTrigger.displayName = 'DialogTrigger';

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, ...props }, ref) => {
  const { setOpen } = useDialogContext('DialogClose');
  return (
    <button
      ref={ref}
      type='button'
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
});
DialogClose.displayName = 'DialogClose';

const dialogContentVariants = cva(
  'relative w-full rounded-xl bg-white shadow-lg border border-slate-200',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full h-full'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, size, onClick, ...props }, ref) => {
    const { open } = useDialogContext('DialogContent');

    return (
      <div
        ref={ref}
        role='document'
        data-state={open ? 'open' : 'closed'}
        className={cn(dialogContentVariants({ size }), className)}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
      />
    );
  }
);
DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, id, ...props }, ref) => {
    const { setTitleId } = useDialogContext('DialogTitle');
    const generatedId = React.useId();
    const titleId = id ?? generatedId;

    React.useEffect(() => {
      setTitleId(titleId);
      return () => setTitleId(undefined);
    }, [setTitleId, titleId]);

    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight text-slate-900',
          className
        )}
        {...props}
      />
    );
  }
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, id, ...props }, ref) => {
  const { setDescriptionId } = useDialogContext('DialogDescription');
  const generatedId = React.useId();
  const descriptionId = id ?? generatedId;

  React.useEffect(() => {
    setDescriptionId(descriptionId);
    return () => setDescriptionId(undefined);
  }, [setDescriptionId, descriptionId]);

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn('text-sm text-slate-500', className)}
      {...props}
    />
  );
});
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContext,
  useDialogContext
};
