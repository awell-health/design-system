import { OptionProps, MultiValue, SingleValue } from 'react-select';

export type SelectItem<T = unknown> = {
  value: string;
  label: string;
  metadata?: T;
};

export type GroupedOption<T = unknown> = {
  label: string;
  options: SelectItem<T>[];
};

export type SelectValue<T = unknown> = SingleValue<SelectItem<T>> | MultiValue<SelectItem<T>>;
export type { OptionProps };
