import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Select, { MultiValue, SingleValue } from 'react-select';
import { SelectItem } from './types';

const selectVariants = cva('', {
  variants: {},
  defaultVariants: {}
});

export interface Props extends VariantProps<typeof selectVariants> {
  options: SelectItem[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange: (option: SingleValue<SelectItem> | MultiValue<SelectItem>) => void;
}

function SelectComponent(props: Props) {
  const { options, onChange, isSearchable = false, isMulti = false } = props;

  return (
    <div className={cn(selectVariants({}))}>
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
          option: (state) => (state.isFocused ? '!bg-slate-100' : '')
        }}
      />
    </div>
  );
}

export { SelectComponent as Select };
