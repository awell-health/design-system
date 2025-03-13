import { OptionProps, MultiValue, SingleValue } from 'react-select';

export type SelectItem = {
  value: string;
  label: string;
};

export type GroupedOption = {
  label: string;
  options: SelectItem[];
};

export type SelectValue = SingleValue<SelectItem> | MultiValue<SelectItem>;
export type { OptionProps };
