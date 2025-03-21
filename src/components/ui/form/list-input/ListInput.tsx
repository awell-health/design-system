import { useEffect, useState } from 'react';
import { Icon } from '../../icon';
import { cn } from '../../../../lib/utils';
import { FC } from 'react';
interface Props {
  value?: string[];
  className?: string;
  pillClassName?: string;
  onChange?: (items: string[]) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  label?: string;
}

const ListInput: FC<Props> = ({
  value,
  pillClassName,
  className,
  onChange,
  error,
  required,
  label,
  placeholder = 'Type to add an item',
  helperText = 'Hit enter or click + to add a new item'
}) => {
  const [items, setItems] = useState<string[]>(value ?? []);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (onChange) {
      onChange(items);
    }
  }, [items]);

  const addItem = () => {
    if (inputValue) {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items].filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <div className='text-sm font-medium text-slate-700'>
          {label} {required && <span className='text-red-500'>*</span>}
        </div>
      )}
      <div
        className={cn(
          'relative flex gap-2 items-center',
          'shadow border border-slate-300 px-1 py-1 min-h-[38px] rounded-lg',
          error && 'border-red-500',
          className
        )}
      >
        <div className='flex gap-2 flex-wrap'>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'bg-slate-100 rounded-lg flex gap-1 px-1 text-sm items-center',
                pillClassName
              )}
            >
              <span className='py-0.5 px-1.5'>{item}</span>
              <Icon
                icon='RiCloseFill'
                className='cursor-pointer rounded-full hover:bg-slate-300'
                size={16}
                onClick={() => removeItem(index)}
              />
            </div>
          ))}
        </div>
        <input
          className={cn(
            'text-sm font-normal',
            'border-none shadow-none',
            'focus:outline-none focus:ring-0 focus:ring-offset-0',
            'placeholder:text-xs'
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addItem();
            }
          }}
        />
        <div className='ml-auto'>
          <Icon
            icon='RiAddFill'
            size={16}
            className='cursor-pointer rounded-full hover:bg-slate-300'
            onClick={addItem}
          />
        </div>
      </div>
      {helperText && <div className='text-xs text-slate-500'>{helperText}</div>}
      {error && <div className='text-xs text-red-500'>{error}</div>}
    </div>
  );
};

export { ListInput };
