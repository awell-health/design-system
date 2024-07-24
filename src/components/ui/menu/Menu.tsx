import { cloneElement } from 'react';
import { cn } from '../../../lib/utils';
import { MenuItem } from './types';

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  items: MenuItem[];
}

function Menu({ className, items, ...props }: Props) {
  const renderMenItem = (item: MenuItem) => {
    const { icon, badge, children, className = '' } = item;

    const itemClassNames = cn(
      'group',
      'h-9 px-3 py-2 rounded-md text-sm font-medium text-slate-700',
      'hover:border-blue-100 hover:bg-blue-100 hover:text-blue-700',
      'active:!border-blue-50 active:!bg-blue-50 active:!text-blue-700',
      !icon && 'ml-2',
      className
    );

    const iconComponent = cloneElement(icon ?? <></>, {
      className: 'fill-slate-500 group-hover:fill-blue-700 group-active:fill-blue-700'
    });

    const label = (
      <>
        {icon && <span>{iconComponent}</span>}
        {item.label}
        {badge && <span className={cn(children && 'mr-1')}>{badge}</span>}
      </>
    );
    return (
      <li>
        {!children && <a className={itemClassNames}>{label}</a>}
        {children && (
          <details>
            <summary className={itemClassNames}>{label}</summary>
            <ul className='before:w-0'>{children.map(renderMenItem)}</ul>
          </details>
        )}
      </li>
    );
  };

  return (
    <ul className={cn('menu', className)} {...props}>
      {items.map(renderMenItem)}
    </ul>
  );
}

export { Menu };
