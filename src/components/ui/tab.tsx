import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabVariants = cva(
  "flex h-10 p-1 bg-slate-100 rounded-lg border border-slate-200  items-center gap-2",
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface TabItem {
  id: string;
  label: string;
  onClick: (item: TabItem) => void;
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
  fullWidth = true,
  ...props
}: TabProps) {
  const renderItem = (item: TabItem): JSX.Element => {
    return (
      <a
        key={item.id}
        role="tab"
        className={cn(
          "tab text-slate-500 rounded-md",
          selected === item.id && "text-slate-700 bg-white shadow",
          fullWidth && 'grow shrink'
        )}
        onClick={() => item.onClick(item)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <div
      role="tablist"
      className={cn(
        tabVariants(),
        className
      )}
      {...props}
    >
      {items.map(renderItem)}
    </div>
  );
}

export { Tab, tabVariants };
