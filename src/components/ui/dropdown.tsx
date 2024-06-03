import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

export type DropdownItem = {
  label: string | JSX.Element
  onClick: () => void
};

const dropdownVariants = cva(
  "dropdown",
  {
    variants: {
      placement: {
        default: "",
        top: "dropdown-top",
        left: "dropdown-left",
        right: "dropdown-right",
        bottom: "dropdown-bottom",
      },
    },
    defaultVariants: {
      placement: "default",
    },
  }
)

export interface DropdownProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
      buttonLabel: string | JSX.Element
      items: Array<DropdownItem>
      buttonClassNames?: string
      itemClassNames?: string
}

function Dropdown(props: DropdownProps) {
  const { items, buttonLabel, buttonClassNames, itemClassNames, placement, className } = props;

  const renderItem = ({ label, onClick }: DropdownItem): JSX.Element => (
    <li className={cn(itemClassNames)}>
      <a onClick={onClick}>{label}</a>
    </li>
  );

  return (
    <details className={cn(dropdownVariants({ placement, className }))}>
      <summary tabIndex={0} role="button" className={cn("btn m-1", buttonClassNames)}>
        {buttonLabel}
      </summary>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items.map(renderItem)}
      </ul>
    </details>
  );
}

export { Dropdown };
