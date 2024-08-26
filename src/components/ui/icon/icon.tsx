import * as React from 'react';

import { ICONS, IconSize, IconType } from './types';

interface Props {
  icon: IconType;
  size?: IconSize;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon = (props: Props): React.JSX.Element => {
  const {
    icon,
    color = 'default',
    className = 'inline',
    size = IconSize.m,
    onClick = undefined
  } = props;

  const IconComponent = ICONS[icon];

  return <IconComponent size={size} color={color} className={className} onClick={onClick} />;
};

export { Icon };
