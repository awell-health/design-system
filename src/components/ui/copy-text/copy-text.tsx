import { FC, useEffect, useState } from 'react';
import { Icon, IconSize } from '../icon';
import React from 'react';
import { cn } from '../../../lib/utils';

interface Props {
  text: string;
  children: React.ReactNode | JSX.Element;
  copiedText?: string;
  position?: 'right' | 'bottom' | 'overlay' | 'inline';
  className?: string;
  iconSize: IconSize
}

export const CopyText: FC<Props> = ({
  text,
  children,
  copiedText,
  position = 'inline',
  className,
  iconSize = IconSize.xxs
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
        'group/copy-text relative cursor-pointer group-hover/copy-text:text-slate-800',
        {
          'flex items-center gap-1': position === 'inline' || position === 'right',
          'font-code': position === 'inline',
        }
      )}
      onClick={() => setCopied(true)}
    >
      {children}
      <span
        className={cn(
          'text-xs items-center gap-1 hidden group-hover/copy-text:flex',
          position === 'right' && 'hover:flex gap-1',
          position === 'bottom' && 'absolute',
          position === 'overlay' &&
            'absolute top-0 left-0 h-full bg-gray-200 opacity-95 rounded-md w-full px-2 py-0.5',
          position === 'inline' && 'flex items-center gap-1',
          className
        )}
      >
        {!copied && (
          <>
            <Icon icon='RiFileCopyFill' className=' fill-slate-500' size={iconSize} />
            {position !== 'inline' && <span className='text-sm text-slate-600'>Click to copy</span>}
          </>
        )}
        {copied && (
          <>
            <Icon icon='RiCheckFill' className=' fill-green-600' size={iconSize} />
            {position !== 'inline' && <span className='text-sm text-green-600'>{copiedText ?? 'Copied to clipboard'}</span>}
          </>
        )}
      </span>
    </span>
  );
};
