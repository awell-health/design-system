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
  className?: string;
}

export interface BorderedTabProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof borderedtabVariants> {
  items: BorderedTabItem[];
  fullWidth?: boolean;
  selected?: string;
}

/**
 * @deprecated use Tab component with prop variant=borderd 
 */
function BorderedTab({
  className,
  items,
  selected,
  fullWidth = true,
  ...props
}: BorderedTabProps) {
  const renderItem = (item: BorderedTabItem): JSX.Element => {
    const { id, label, onClick, className: tabClassName } = item;
      return (
        <a 
          role="tab" 
          key={id} 
          className={cn(
            "tab h-[3rem]",
            selected === id && "tab-active",
            tabClassName
          )}
          onClick={() => onClick(item)}
        >
          {label}
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
