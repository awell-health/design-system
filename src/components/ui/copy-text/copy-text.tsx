import { FC, useEffect, useState } from 'react';
import { Icon, IconSize } from '../icon';
import React from 'react';
import { cn } from '../../../lib/utils';

interface Props {
  text: string;
  children: React.ReactNode | JSX.Element;
  className?: string;
}

export const CopyText: FC<Props> = ({
  text,
  children,
  className
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      navigator.clipboard.writeText(text);
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <span
      className={cn(
        'group/copy-text relative cursor-pointer font-mono flex items-center gap-1',
      )}
      onClick={() => setCopied(true)}
    >
      {children}
      <span
        className={cn(
          'flex text-xs items-center gap-1 group-hover/copy-text:flex',
          className
        )}
      >
        {!copied && (
            <Icon icon='RiFileCopyFill' className=' fill-slate-500' size={IconSize.xxs} />
        )}
        {copied && (
            <Icon icon='RiCheckFill' className=' fill-green-600' size={IconSize.xxs} />
        )}
      </span>
    </span>
  );
};
