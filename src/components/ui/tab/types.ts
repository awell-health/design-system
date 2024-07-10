import { ReactElement } from 'react';

export interface TabItem {
  id: string;
  label: string | JSX.Element | ReactElement;
  onClick: (item: TabItem) => void;
  className?: string;
}
