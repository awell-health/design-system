import { FC } from 'react';

interface Props {
  title: string;
  hint?: string;
  isRequired?: boolean;
  children: React.ReactNode | JSX.Element | string;
}

export const FormSection: FC<Props> = ({ children, title, hint = null, isRequired = false }) => {
  return (
    <div className='py-6 flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <h5 className='text-lg font-medium leading-5 text-neutral-dark-800'>
          {title}
          {isRequired && <span className='text-red-500 ml-0.5'>*</span>}
        </h5>
        {hint !== null && <div className='text-gray-500'>{hint}</div>}
      </div>
      <div className='mt-2'>{children}</div>
    </div>
  );
};
