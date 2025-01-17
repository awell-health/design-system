import { cn } from '@/lib/utils';
import Select, { MultiValue, SingleValue } from 'react-select';
import { SelectItem, SelectValue } from './types';
import { cloneElement, ReactElement } from 'react';

export interface Props {
  options: SelectItem[];
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  onChange?: (option: SelectValue) => void;
  // use handleChange for to use SelecItem type
  handleChange?: (value: SelectItem | SelectItem[]) => void;
  icon?: JSX.Element | ReactElement;
  label?: string | JSX.Element | ReactElement;
  value?: SelectItem | SelectItem[] | undefined;
  disabled?: boolean;
  placeholder?: string;
  menuPosition?: 'fixed' | 'absolute';
  hasError?: boolean;
}

function SelectComponent(props: Props) {
  const {
    options,
    onChange,
    handleChange,
    isSearchable = false,
    isMulti = false,
    icon = null,
    label = null,
    value = undefined,
    isClearable = false,
    disabled = false,
    placeholder = 'Select...',
    menuPosition = 'absolute',
    hasError = false
  } = props;
  const iconPadding = cn(!isMulti && icon && 'pl-5');

  if (!onChange && !handleChange) {
    console.log('onChange or handleChange is required');
    return null;
  }

  const handleSelectChange = (newValue: SingleValue<SelectItem> | MultiValue<SelectItem>) => {
    if (handleChange) {
      handleChange(newValue as SelectItem | SelectItem[]);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className='flex flex-col gap-1.5'>
      {label && <div className='text-slate-600 text-sm font-medium'>{label}</div>}
      <div className='relative'>
        {!isMulti && icon && (
          <span className='absolute z-10 left-2 top-2.5'>
            {cloneElement(icon, { className: 'fill-slate-500', size: 16 })}
          </span>
        )}
        <Select
          placeholder={placeholder}
          options={options}
          onChange={handleSelectChange}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
          value={value}
          isDisabled={disabled}
          menuPosition={menuPosition}
          classNames={{
            control: (state) =>
              cn(
                '!rounded-lg !shadow border !border-slate-300 text-slate-500 text-sm font-normal',
                state.isFocused && '!border-blue-500 !text-black',
                hasError && '!border-red-500 !text-red-500'
              ),
            menu: () =>
              '!rounded-lg !shadow border-1 !border-slate-200 text-slate-700 text-sm font-normal',
            menuList: () => '!pt-0 !pb-0 !rounded-lg',
            option: (state) =>
              cn(
                state.isFocused && '!bg-slate-100',
                state.isSelected && '!text-slate-700 !bg-slate-200'
              ),
            singleValue: () => iconPadding,
            multiValue: () => '!rounded',
            multiValueLabel: () => 'bg-slate-200',
            multiValueRemove: () => 'bg-slate-200 hover:bg-red-300',
            placeholder: () => iconPadding,
            input: () => iconPadding
          }}
        />
      </div>
    </div>
  );
}

export { SelectComponent as Select };
