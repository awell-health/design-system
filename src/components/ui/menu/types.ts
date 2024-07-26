import { ReactNode } from 'react';

export interface MenuItem {
  label: string | JSX.Element | ReactNode;
  icon?: JSX.Element;
  badge?: JSX.Element;
  onClick?: () => void;
  children?: MenuItem[];
  className?: string;
  active?: boolean;
}
