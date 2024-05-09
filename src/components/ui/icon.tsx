import * as React from "react";
import * as RemixIcon from "@remixicon/react";

export enum IconSize {
  xs = 16,
  s = 20,
  m = 24,
  l = 28,
  xl = 32,
}

export type IconType = keyof typeof RemixIcon;

interface Props {
  icon: IconType;
  size?: IconSize;
  color?: string;
  className?: string;
}

const Icon = (props: Props): React.JSX.Element => {
  const { icon, color = "default", className = "inline", size = IconSize.m } = props

  const IconComponent = RemixIcon[icon]

  return <IconComponent size={size} color={color} className={className} />;
};

export { Icon };
