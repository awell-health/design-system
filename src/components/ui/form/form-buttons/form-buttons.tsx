import { FC } from 'react';
import { cn } from '../../../../lib/utils';

interface Props {
  remove?: React.ReactNode | JSX.Element;
  cancel?: React.ReactNode | JSX.Element;
  save?: React.ReactNode | JSX.Element;
}

export const FormButtons: FC<Props> = (props) => {
  const { remove, cancel, save } = props;

  return (
    <div className='flex justify-between mt-4'>
      {remove && <div className='flex gap-4'>{remove}</div>}
      <div className={cn('flex gap-4', { 'ml-auto': !remove })}>
        {cancel && cancel}
        {save && save}
      </div>
    </div>
  );
};
