import { AnchorHTMLAttributes, ReactNode } from 'react';

export interface MenuItem {
  label: string | JSX.Element | ReactNode;
  icon?: JSX.Element;
  badge?: JSX.Element;
  onClick?: () => void;
  children?: MenuItem[];
  isExpanded?: boolean;
  className?: string;
  active?: boolean;
  /**
   * When set, the item renders as a real anchor with this `href`, enabling
   * native browser behavior (right-click "Open in new tab", cmd/ctrl/middle
   * click). `onClick` still fires for SPA navigation. Pass a plain string as
   * `label` (not a nested `<a>`) to avoid invalid nested anchors.
   */
  href?: string;
  /** Anchor target, e.g. `_blank`. Only applies when `href` is set. */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
}
