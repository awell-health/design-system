import { MultiValue } from 'react-select';

import { SingleValue } from 'react-select';

export type SelectItem = {
  value: string;
  label: string;
};

export type SelectValue = SingleValue<SelectItem> | MultiValue<SelectItem>;
