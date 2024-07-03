import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabVariants = cva("tabs border-slate-200", {
  variants: {
    variant: {
      default:
        [
          "flex p-1 bg-slate-100 rounded-lg border items-center gap-2",
          "[&_.tab]:rounded-md", 
          "[&_.tab-active]:text-slate-700 [&_.tab-active]:bg-white [&_.tab-active]:shadow"
        ].join(' '),
      bordered: [
        "flex px-1 items-start border-b gap-4",
        "[&_.tab-active]:text-blue-600 [&_.tab-active]:!border-blue-600 [&_.tab-active]:border-b"
      ].join(' '),
    },
    size: {
      sm: "",
      md: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "sm"
  },
});

export interface TabItem {
  id: string;
  label: string;
  onClick: (item: TabItem) => void;
  className?: string;
}

export interface TabProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabVariants> {
  items: TabItem[];
  fullWidth?: boolean;
  selected?: string;
}

function Tab({
  className,
  items,
  selected,
  variant,
  size,
  fullWidth = true,
  ...props
}: TabProps) {
  const renderItem = (item: TabItem): JSX.Element => {
    const { id, label, onClick, className: tabClassName } = item;

    return (
      <a
        key={id}
        role="tab"
        className={cn(
          "tab flex text-slate-500",
          selected === id && "tab-active",
          fullWidth && "grow shrink",
          variant === 'default' && size === "md" && "h-11 px-3.5 py-2.5 text-base",
          variant === 'default' && size === "sm" && "h-8 px-3 py-2 text-xs",
          variant === 'bordered' && size === "md" && "px-1 pb-4 h-[42px] text-base",
          variant === 'bordered' && size === "sm" && "px-1 pb-4 h-[34px] text-xs",
          tabClassName,
        )}
        onClick={() => onClick(item)}
      >
        {label}
      </a>
    );
  };

  return (
    <div
      role="tablist"
      className={cn(tabVariants({ variant }), className)}
      {...props}
    >
      {items.map(renderItem)}
    </div>
  );
}

export { Tab, tabVariants };
