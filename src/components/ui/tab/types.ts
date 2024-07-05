export interface TabItem {
  id: string;
  label: string;
  onClick: (item: TabItem) => void;
  className?: string;
}
