import { FC } from 'react';
import { cn } from '@/lib/utils';
interface Props {
  title: string;
  hint?: string;
  isRequired?: boolean;
  children: React.ReactNode | JSX.Element | string;
  showSeparator?: boolean;
  className?: string;
}

export const FormSection: FC<Props> = ({
  children,
  title,
  hint = null,
  isRequired = false,
  className,
  showSeparator = false
}) => {
  return (
    <div className={cn('py-4 flex flex-col gap-2', className)}>
      <div className='flex flex-col'>
        <h5 className='text-lg font-medium leading-5 text-gray-600'>
          {title}
          {isRequired && <span className='text-red-500 ml-0.5'>*</span>}
        </h5>
        {hint !== null && <div className='text-gray-400'>{hint}</div>}
      </div>
      {children}
      {showSeparator && <hr className='mt-4' />}
    </div>
  );
};
