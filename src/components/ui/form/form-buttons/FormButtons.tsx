import { FC } from 'react';

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
      <div className='flex gap-4'>
        {cancel && cancel}
        {save && save}
      </div>
    </div>
  );
};
