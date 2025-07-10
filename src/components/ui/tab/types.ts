import { ReactElement } from 'react';

export interface TabItem {
  id: string;
  label: string | JSX.Element | ReactElement;
  onClick?: (item: TabItem) => void; // Made optional for href-only tabs
  className?: string;
  // New props for link support
  href?: string;
  target?: string;
  disabled?: boolean;
}
