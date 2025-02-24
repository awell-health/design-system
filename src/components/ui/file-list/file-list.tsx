import { FC } from 'react';
import { Button } from '../button/button';
import { Icon } from '../icon';
import { FileListItem } from './types';

interface Props {
  files: Array<FileListItem>;
  onDelete: (file: FileListItem) => void;
  generalProgress?: number;
}

const FileList: FC<Props> = ({ files, onDelete, generalProgress = undefined }) => {
  const renderFileItem = (file: FileListItem, index: number) => {
    const showProgress = !file.error && file.progress && file.progress > 0 && file.progress < 100;
    return (
      <div
        key={index}
        className='flex flex-row items-center gap-4 px-4 py-2 border border-gray-200 rounded-md file-list-item'
      >
        <div>
          <Icon icon='RiFileLine' />
        </div>
        <div className='flex flex-1 flex-col'>
          <div>{file.name}</div>
          <div className='w-full pr-4'>
            {file.error && <div className='text-red-600 text-sm'>{file.error}</div>}
            {showProgress && (
              <progress className='progress progress-info' value={file.progress} max='100' />
            )}
            {!showProgress && !file.error && (
              <div className='text-sm text-gray-500'>
                {file.size ? (file.size / 1024 / 1024).toFixed(2) : '0.00'}MB
              </div>
            )}
          </div>
        </div>
        <div className='ml-auto'>
          <Button variant='secondary' size={null} shape='squareSm' onClick={() => onDelete(file)}>
            <Icon icon='RiDeleteBinLine' size={16} className='fill-red-600' />
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className='flex flex-col gap-2'>
      {generalProgress && (
        <div className='flex flex-col gap-1 pb-2'>
          <div>Uploading files...</div>
          <progress className='progress progress-info' value={generalProgress} max='100' />
        </div>
      )}
      {files.map((file, index) => renderFileItem(file, index))}
    </div>
  );
};

export { FileList };
