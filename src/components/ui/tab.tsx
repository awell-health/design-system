import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabVariants = cva("tabs border-slate-200", {
  variants: {
    variant: {
      default:
        [
          "flex h-10 p-1 bg-slate-100 rounded-lg border items-center gap-2",
          "[&_.tab]:rounded-md", 
          "[&_.tab-active]:text-slate-700 [&_.tab-active]:bg-white [&_.tab-active]:shadow"
        ].join(' '),
      bordered: [
        "flex h-8 px-1 items-center border-b",
        "[&_.tab]:items-start",
        "[&_.tab-active]:text-blue-600 [&_.tab-active]:!border-blue-600 [&_.tab-active]:border-b"
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: "default",
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
          "tab text-slate-500 text-xs font-medium",
          selected === id && "tab-active",
          fullWidth && "grow shrink",
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
