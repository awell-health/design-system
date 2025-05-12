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
}

function Dropdown(props: DropdownProps) {
  const { items, buttonLabel, buttonClassNames, itemClassNames, placement, className } = props;

  const renderItem = ({ label, onClick }: DropdownItem, i: number): JSX.Element => (
    <li key={i} className={cn(itemClassNames)}>
      <a onClick={onClick}>{label}</a>
    </li>
  );

  return (
    <div className={cn(dropdownVariants({ placement, className }))}>
      <div tabIndex={0} role='button' className={cn('btn m-1', buttonClassNames)}>
        {buttonLabel}
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        {items.map(renderItem)}
      </ul>
    </div>
  );
}

export { Dropdown };
