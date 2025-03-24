import { FC, ReactNode } from 'react';
import { cn } from '../../../../lib/utils';

interface Props {
  label: string | ReactNode | JSX.Element;
  sublabel?: string;
  className?: string;
  required?: boolean;
}

export const Label: FC<Props> = ({ label, sublabel, className, required }) => {
  return (
    <>
      <div className={cn('label', 'flex flex-col gap-1 items-start', className)}>
        <span className=' label-text text-slate-600 text-sm font-medium'>
          {label}
          {required && <span className='text-red-600 ml-0.5'>*</span>}
        </span>
        {sublabel && (
          <span className='label-text text-slate-400 text-xs font-normal'>{sublabel}</span>
        )}
      </div>
    </>
  );
};
