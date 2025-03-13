import { MultiValue, SingleValue } from 'react-select';

export type SelectItem = {
  value: string;
  label: string;
};

export type GroupedOption = {
  value: string;
  label: string;
  options: SelectItem[];
};

export type SelectValue = SingleValue<SelectItem> | MultiValue<SelectItem>;
