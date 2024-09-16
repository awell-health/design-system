import * as React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  children?: React.ReactNode | string | JSX.Element;
  value: number;
  style?: object;
}

const RadialProgress: React.FC<Props> = ({ value, className, children, style, ...props }) => {
  const styles = { '--value': value, ...style } as React.CSSProperties;

  return (
    <div className={cn('radial-progress', className)} style={styles} {...props}>
      {children}
    </div>
  );
};

RadialProgress.displayName = 'RadialProgress';

export { RadialProgress };
