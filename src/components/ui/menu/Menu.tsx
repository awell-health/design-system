import { cloneElement } from 'react';
import { cn } from '../../../lib/utils';
import { MenuItem } from './types';

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  items: MenuItem[];
  iconOnly?: boolean;
}

function Menu({ className, items, iconOnly = false, ...props }: Props) {
  const renderMenItem = (item: MenuItem) => {
    const { icon, badge, children, active = false, className = '', onClick = undefined } = item;

    const itemClassNames = cn(
      'group flex box-border',
      'h-9 pl-2 pr-3 py-2 mb-1 rounded-md text-sm font-medium text-slate-700',
      'hover:border-blue-100 hover:bg-blue-100 hover:text-blue-700',
      'active:!border-blue-100 active:!bg-blue-50 active:!text-blue-700',
      active && 'border border-blue-100 bg-blue-50 text-blue-700',
      !icon && 'ml-3',
      iconOnly && 'p-0 h-9 w-9 px-3 py-2 items-center justify-center',
      iconOnly && active && 'shadow',
      className
    );

    const iconComponent = cloneElement(icon ?? <></>, {
      className: cn(
        'fill-slate-500 group-hover:fill-blue-700 group-active:fill-blue-700',
        active && 'fill-blue-700'
      )
    });

    const label = (
      <span className='flex flex-1 items-center gap-3'>
        {icon && <span>{iconComponent}</span>}
        {!iconOnly && item.label}
        {badge && <span className={cn(children && 'mr-1')}>{badge}</span>}
      </span>
    );
    return (
      <li>
        {(!children || iconOnly) && (
          <a className={itemClassNames} onClick={onClick}>
            {label}
          </a>
        )}
        {!iconOnly && children && (
          <details>
            <summary className={itemClassNames} onClick={onClick}>
              {label}
            </summary>
            <ul className='before:w-0'>{children.map(renderMenItem)}</ul>
          </details>
        )}
      </li>
    );
  };

  return (
    <ul className={cn('menu p-0', className)} {...props}>
      {items.map(renderMenItem)}
    </ul>
  );
}

export { Menu };
