import * as React from 'react';
import { cn } from '@/lib/utils';
import { DateInput } from './DateInput';
import { TimeInput } from './TimeInput';
import type { DateTimeInputProps } from './types';

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label
}) => {
  const [date, setDate] = React.useState<Date>(value || new Date());

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  const handleDateChange = (newDate: Date) => {
    if (disabled) return;

    const updatedDate = new Date(newDate);
    if (date) {
      updatedDate.setHours(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );
    }

    setDate(updatedDate);
    onChange(updatedDate);
  };

  const handleTimeChange = (newTime: Date) => {
    if (disabled) return;

    const updatedDate = new Date(date);
    updatedDate.setHours(
      newTime.getHours(),
      newTime.getMinutes(),
      newTime.getSeconds(),
      newTime.getMilliseconds()
    );

    setDate(updatedDate);
    onChange(updatedDate);
  };

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      {label && <span className='text-xs text-slate-500 font-medium'>{label}</span>}
      <div className='flex flex-col sm:flex-row gap-2'>
        <DateInput value={date} onChange={handleDateChange} disabled={disabled} />
        <TimeInput value={date} onChange={handleTimeChange} disabled={disabled} />
      </div>
    </div>
  );
};

DateTimeInput.displayName = 'DateTimeInput';

export { DateTimeInput };
