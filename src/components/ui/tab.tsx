import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabVariants = cva("tabs", {
  variants: {
    variant: {
      default:
        "flex h-10 p-1 bg-slate-100 rounded-lg border border-slate-200  items-center gap-2",
      bordered: "tabs-bordered",
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
    const { id, label, onClick, className: tabClassName = "" } = item;

    return (
      <a
        key={id}
        role="tab"
        className={cn(
          "tab",
          variant === "default" && "text-slate-500 rounded-md",
          variant === "default" &&
            selected === id &&
            "text-slate-700 bg-white shadow",
          variant === "bordered" && "h-[3rem]",
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
