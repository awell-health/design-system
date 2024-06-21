import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
// TODO: this should really be a variant of Tab but I could not get it to work in the short time I had
// ideally pick it up next week and refactor both
const borderedtabVariants = cva(
  "tabs tabs-bordered",
  {
    variants: {
    },
    defaultVariants: {
    },
  }
);

export interface BorderedTabItem {
  id: string;
  label: string | JSX.Element;
  onClick: (item: BorderedTabItem) => void;
}

export interface BorderedTabProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof borderedtabVariants> {
  items: BorderedTabItem[];
  fullWidth?: boolean;
  selected?: string;
}

function BorderedTab({
  className,
  items,
  selected,
  fullWidth = true,
  ...props
}: BorderedTabProps) {
  const renderItem = (item: BorderedTabItem): JSX.Element => {
      return (
        <a 
          role="tab" 
          key={item.id} 
          className={cn(
            "tab",
            selected === item.id && "tab-active [--tab-border-bottom-color:blue-700]",
          )}
          onClick={() => item.onClick(item)}
        >
          {item.label}
        </a>
      )
  };

  return (
    <div
      role="tablist"
      className={cn(
        borderedtabVariants(),
        className
      )}
      {...props}
    >
      {items.map(renderItem)}
    </div>
  );
}

export { BorderedTab, borderedtabVariants };
