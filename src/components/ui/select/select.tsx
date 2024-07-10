import { cn } from '@/lib/utils';
import Select, { MultiValue, SingleValue } from 'react-select';
import { SelectItem } from './types';
import { cloneElement } from 'react';

export interface Props {
  options: SelectItem[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange: (option: SingleValue<SelectItem> | MultiValue<SelectItem>) => void;
  icon?: JSX.Element;
}

function SelectComponent(props: Props) {
  const { options, onChange, isSearchable = false, isMulti = false, icon = null } = props;
  const iconPadding = cn(icon && 'pl-5');

  return (
    <div className={cn('relative')}>
      {icon && (
        <span className='absolute z-10 left-2 top-2.5'>
          {cloneElement(icon, { className: 'fill-slate-500', size: 16 })}
        </span>
      )}
      <Select
        options={options}
        onChange={onChange}
        isSearchable={isSearchable}
        isMulti={isMulti}
        classNames={{
          control: (state) =>
            cn(
              'rounded-lg shadow border border-slate-300 text-slate-500 text-sm font-normal',
              state.isFocused && 'border-blue-500 text-black'
            ),
          menu: () =>
            'rounded-lg shadow border-1 border-slate-200 text-slate-700 text-sm font-normal',
          menuList: () => '!pt-0 !pb-0',
          option: (state) =>
            cn(
              state.isFocused && '!bg-slate-100',
              state.isSelected && '!text-slate-700 !bg-slate-200'
            ),
          singleValue: () => iconPadding,
          placeholder: () => iconPadding,
          input: () => iconPadding
        }}
      />
    </div>
  );
}

export { SelectComponent as Select };
