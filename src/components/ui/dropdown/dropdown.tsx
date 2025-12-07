import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { DropdownItem } from './types';

const dropdownVariants = cva('dropdown', {
  variants: {
    placement: {
      default: '',
      top: 'dropdown-top dropdown-start',
      left: 'dropdown-left',
      right: 'dropdown-right',
      bottom: 'dropdown-bottom dropdown-start',
      'bottom-end': 'dropdown-bottom dropdown-end',
      'top-end': 'dropdown-top dropdown-end'
    }
  },
  defaultVariants: {
    placement: 'default'
  }
});

export interface DropdownProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  buttonLabel: string | JSX.Element;
  items: Array<DropdownItem>;
  buttonClassNames?: string;
  itemClassNames?: string;
  listClassNames?: string;
}

function Dropdown(props: DropdownProps) {
  const {
    items,
    buttonLabel,
    buttonClassNames,
    itemClassNames,
    listClassNames,
    placement,
    className
  } = props;

  const renderItem = ({ label, onClick, disabled }: DropdownItem, i: number): JSX.Element => (
    <li key={i} className={cn(itemClassNames)}>
      <a
        onClick={disabled ? undefined : onClick}
        className={cn(
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none text-slate-500'
        )}
      >
        {label}
      </a>
    </li>
  );

  return (
    <div className={cn(dropdownVariants({ placement, className }))}>
      <div tabIndex={0} role='button' className={cn('btn m-1', buttonClassNames)}>
        {buttonLabel}
      </div>
      <ul
        tabIndex={0}
        className={cn(
          'dropdown-content z-[9999] menu p-2 shadow bg-base-100 rounded-box w-52',
          listClassNames
        )}
      >
        {items.map(renderItem)}
      </ul>
    </div>
  );
}

export { Dropdown };
