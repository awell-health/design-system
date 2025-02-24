import { ChangeEvent, FC, useRef, useState } from 'react';
import { Button } from '../button/button';
import { cn } from '../../../lib/utils';
import { AcceptedFileTypes } from './types';

interface Props {
  label?: string;
  onChange: (files: FileList) => void;
  error?: string;
  isMultiple?: boolean;
  accept?: AcceptedFileTypes[];
  maxSizeMb?: number;
}

const FileUpload: FC<Props> = ({
  label,
  onChange,
  isMultiple = false,
  accept = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx', '.txt'],
  maxSizeMb = 2 // Default max size to 2MB
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // validate files size
      const validFiles = Array.from(files).filter((file) => {
        console.log('file', file, file.size);
        return file.size <= maxSizeMb * 1024 * 1024;
      });

      if (validFiles.length !== files.length) {
        setError(`Some files exceed the maximum size of ${maxSizeMb}MB.`);
        return;
      }

      if (isMultiple) {
        onChange(validFiles as unknown as FileList);
      } else if (validFiles.length > 0) {
        onChange([validFiles[0]] as unknown as FileList);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => file.size <= maxSizeMb * 1024 * 1024);
      if (validFiles.length !== files.length) {
        alert(`Some files exceed the maximum size of ${maxSizeMb}MB.`);
      }
      if (validFiles.length > 0) {
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', {
          value: { files: validFiles }
        });
        handleChange({ target: { files: validFiles } } as unknown as ChangeEvent<HTMLInputElement>);
      }
    }
    setIsDragging(false);
  };

  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
      <input
        type='file'
        onChange={handleChange}
        className='hidden'
        ref={inputRef}
        multiple={isMultiple}
        accept={accept.join(',')}
      />
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 border border-dashed border-gray-300 rounded-md p-4 relative w-full',
          {
            'border-blue-500': isDragging
          }
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <div>Drag & Drop your files here or</div>
        <Button variant='secondaryBlue' size='sm' onClick={() => inputRef.current?.click()}>
          Choose Files
        </Button>
        <div className='text-sm text-gray-500 text-center'>
          Maximum file size {maxSizeMb}MB <br />
          Supported file types: {accept.join(', ')}
        </div>
        {isDragging && (
          <div className='absolute inset-0 bg-white/90 rounded-md'>
            <div className='flex items-center justify-center h-full'>
              <p className='text-gray-500 text-sm'>Drop files here</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export { FileUpload };
