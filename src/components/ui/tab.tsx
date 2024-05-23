import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabVariants = cva("tabs", {
  variants: {
    size: {
      xs: "tabs-xs p-1",
      sm: "tabs-sm p-1.5",
      lg: "tabs-lg p-2",
    },
  },
  defaultVariants: {
    size: 'sm'
  }
});

export interface TabItem {
  id: string;
  label: string;
  onClick: (item: TabItem) => void;
}

export interface TabProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabVariants> {
  items: TabItem[];
  selected?: string;
}

function Tab({ className, size, items, selected, ...props }: TabProps) {
  const renderItem = (item: TabItem): JSX.Element => {
    
    return (
      <a
        key={item.id}
        role="tab"
        className={cn("tab text-slate-500 rounded-md", selected === item.id && "text-slate-700 bg-white shadow")}
        onClick={() => item.onClick(item)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <div
      role="tablist"
      className={cn(tabVariants({ size }), "bg-slate-100 gap-2 rounded-lg border border-slate-200", className)}
      {...props}
    >
      {items.map(renderItem)}
    </div>
  );
}

export { Tab, tabVariants };
