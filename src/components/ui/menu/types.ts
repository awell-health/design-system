export interface MenuItem {
  label: string | JSX.Element;
  icon?: JSX.Element;
  badge?: JSX.Element;
  onClick?: () => void;
  children?: MenuItem[];
  className?: string;
}
