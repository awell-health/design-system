import { cn } from "@/lib/utils";

export type DropdownItem = {
  label: string
  onClick: () => void
};

export interface DropdownProps {
  buttonLabel: string | JSX.Element
  items: Array<DropdownItem>
  buttonClassNames?: string
  itemClassNames?: string
}

function Dropdown(props: DropdownProps) {
  const { items, buttonLabel, buttonClassNames, itemClassNames } = props;

  const renderItem = ({ label, onClick }: DropdownItem): JSX.Element => (
    <li className={cn(itemClassNames)}>
      <a onClick={onClick}>{label}</a>
    </li>
  );

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className={cn("btn m-1", buttonClassNames)}>
        {buttonLabel}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items.map(renderItem)}
      </ul>
    </div>
  );
}

export { Dropdown };
