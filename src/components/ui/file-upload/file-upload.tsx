import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Button } from '../button/button';
import { cn } from '../../../lib/utils';

interface Props {
  label?: string;
  onChange: (files: FileList) => void;
  error?: string;
  isMultiple?: boolean;
  accept?: string[];
  maxSizeMb?: number;
  onError?: (error: string) => void;
  translations?: {
    dropFilesHere: string;
    chooseFiles: string;
    someFilesExceedMaxSize: string;
    supportedFileTypes: string;
    maxFileSize: string;
  };
}

const FileUpload: FC<Props> = ({
  label,
  onChange,
  isMultiple = false,
  accept = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx', '.txt'],
  maxSizeMb = 2, // Default max size to 2MB
  onError = undefined,
  translations = {
    dropFilesHere: 'Drop files here or',
    chooseFiles: 'Choose Files',
    someFilesExceedMaxSize: 'Some files exceed the maximum size of',
    supportedFileTypes: 'Supported file types:',
    maxFileSize: 'Maximum file size'
  }
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      // validate files size
      const validFiles = Array.from(files).filter((file) => {
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
        setError(`Some files exceed the maximum size of ${maxSizeMb}MB.`);
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
        <div>{translations.dropFilesHere}</div>
        <Button variant='secondaryBlue' size='sm' onClick={() => inputRef.current?.click()}>
          {translations.chooseFiles}
        </Button>
        <div className='text-sm text-gray-500 text-center'>
          {translations.maxFileSize} {maxSizeMb}MB <br />
          {translations.supportedFileTypes} {accept.join(', ')}
        </div>
        {isDragging && (
          <div className='absolute inset-0 bg-white/90 rounded-md'>
            <div className='flex items-center justify-center h-full'>
              <p className='text-gray-500 text-sm'>{translations.dropFilesHere}</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export { FileUpload };
