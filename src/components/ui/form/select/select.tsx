import { cn } from '@/lib/utils';
import Select, { MultiValue, SingleValue, components } from 'react-select';
import { GroupedOption, SelectItem, SelectValue } from './types';
import { cloneElement, ReactElement } from 'react';
import { Label } from '../label/label';

export interface Props {
  options: SelectItem[] | GroupedOption[];
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  onChange?: (option: SelectValue) => void;
  // use handleChange for to use SelecItem type
  handleChange?: (value: SelectItem | SelectItem[]) => void;
  icon?: JSX.Element | ReactElement;
  label?: string | JSX.Element | ReactElement;
  sublabel?: string;
  value?: SelectItem | SelectItem[] | undefined;
  disabled?: boolean;
  placeholder?: string;
  menuPosition?: 'fixed' | 'absolute';
  hasError?: boolean;
  CustomOptionComponent?: (data: SelectItem) => ReactElement;
  SingleValueComponent?: (data: SelectItem) => ReactElement;
  ValueContainerComponent?: () => ReactElement;
  labelClassName?: string;
  required?: boolean;
  isOptionDisabled?: (option: SelectItem) => boolean;
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
    hasError = false,
    CustomOptionComponent = undefined,
    SingleValueComponent = undefined,
    labelClassName = '',
    sublabel,
    required = false,
    isOptionDisabled = undefined
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
    <div className='flex flex-col'>
      {label && (
        <Label label={label} sublabel={sublabel} className={labelClassName} required={required} />
      )}
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
          isOptionDisabled={isOptionDisabled}
          components={{
            Option: ({ children, ...rest }) => (
              <components.Option {...rest}>
                {CustomOptionComponent ? CustomOptionComponent(rest.data) : children}
              </components.Option>
            ),
            SingleValue: ({ children, ...rest }) => (
              <components.SingleValue {...rest}>
                {SingleValueComponent ? SingleValueComponent(rest.data) : children}
              </components.SingleValue>
            )
          }}
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
            input: () => iconPadding,
            groupHeading: () =>
              '!text-slate-900 !font-semibold pl-2.5 border-b border-slate-200 pb-2 !text-transform-none !text-[14px] !normal-case'
          }}
        />
      </div>
    </div>
  );
}

export { SelectComponent as Select };
