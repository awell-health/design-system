import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../icon';
import type { TimeInputProps } from './types';

interface TimeParts {
  hours: number;
  minutes: number;
  ampm: 'AM' | 'PM';
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, disabled = false, className }) => {
  const [time, setTime] = React.useState<TimeParts>(() => {
    const d = value ? new Date(value) : new Date();
    const hours = d.getHours();
    return {
      hours: hours % 12 === 0 ? 12 : hours % 12,
      minutes: d.getMinutes(),
      ampm: hours >= 12 ? 'PM' : 'AM'
    };
  });

  const hoursRef = React.useRef<HTMLInputElement | null>(null);
  const minutesRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (value) {
      const d = new Date(value);
      const hours = d.getHours();
      setTime({
        hours: hours % 12 === 0 ? 12 : hours % 12,
        minutes: d.getMinutes(),
        ampm: hours >= 12 ? 'PM' : 'AM'
      });
    }
  }, [value]);

  const updateTime = (newTime: TimeParts) => {
    if (disabled) return;

    const currentDate = value ? new Date(value) : new Date();
    const hours =
      newTime.ampm === 'PM' && newTime.hours !== 12
        ? newTime.hours + 12
        : newTime.ampm === 'AM' && newTime.hours === 12
          ? 0
          : newTime.hours;

    currentDate.setHours(hours);
    currentDate.setMinutes(newTime.minutes);
    currentDate.setSeconds(0);

    onChange(currentDate);
    setTime(newTime);
  };

  const handleInputChange =
    (field: keyof TimeParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const inputValue = e.target.value.replace(/\D/g, '');
      if (!inputValue) return;

      const numValue = Number.parseInt(inputValue, 10);

      let newValue: number = numValue;
      if (field === 'hours') {
        if (numValue < 1) newValue = 1;
        else if (numValue > 12) newValue = 12;
      } else if (field === 'minutes') {
        if (numValue < 0) newValue = 0;
        else if (numValue > 59) newValue = 59;
      }

      updateTime({ ...time, [field]: newValue });
    };

  const handleAmPmToggle = () => {
    if (disabled) return;
    updateTime({ ...time, ampm: time.ampm === 'AM' ? 'PM' : 'AM' });
  };

  const incrementHours = () => {
    if (disabled) return;
    const newHours = time.hours === 12 ? 1 : time.hours + 1;
    updateTime({ ...time, hours: newHours });
  };

  const decrementHours = () => {
    if (disabled) return;
    const newHours = time.hours === 1 ? 12 : time.hours - 1;
    updateTime({ ...time, hours: newHours });
  };

  const incrementMinutes = () => {
    if (disabled) return;
    const newMinutes = (time.minutes + 1) % 60;
    updateTime({ ...time, minutes: newMinutes });
  };

  const decrementMinutes = () => {
    if (disabled) return;
    const newMinutes = (time.minutes - 1 + 60) % 60;
    updateTime({ ...time, minutes: newMinutes });
  };

  const formatTimeValue = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-1 rounded-lg border border-slate-300 p-1 bg-white',
        disabled && 'opacity-50 bg-slate-50',
        className
      )}
    >
      <div className='flex flex-col items-center'>
        <button
          type='button'
          className={cn(
            'h-5 w-5 flex items-center justify-center rounded hover:bg-slate-100',
            disabled && 'cursor-not-allowed hover:bg-transparent'
          )}
          onClick={incrementHours}
          disabled={disabled}
          aria-label='Increment hours'
        >
          <Icon icon='RiArrowUpSLine' className='h-3 w-3 text-slate-600' />
        </button>
        <input
          ref={hoursRef}
          type='text'
          inputMode='numeric'
          value={formatTimeValue(time.hours)}
          onChange={handleInputChange('hours')}
          className={cn(
            'w-7 border-0 text-center focus:outline-none focus:ring-0 p-0 bg-transparent text-sm',
            disabled && 'cursor-not-allowed'
          )}
          disabled={disabled}
          aria-label='Hours'
        />
        <button
          type='button'
          className={cn(
            'h-5 w-5 flex items-center justify-center rounded hover:bg-slate-100',
            disabled && 'cursor-not-allowed hover:bg-transparent'
          )}
          onClick={decrementHours}
          disabled={disabled}
          aria-label='Decrement hours'
        >
          <Icon icon='RiArrowDownSLine' className='h-3 w-3 text-slate-600' />
        </button>
      </div>
      <span className='text-sm font-medium text-slate-400'>:</span>
      <div className='flex flex-col items-center'>
        <button
          type='button'
          className={cn(
            'h-5 w-5 flex items-center justify-center rounded hover:bg-slate-100',
            disabled && 'cursor-not-allowed hover:bg-transparent'
          )}
          onClick={incrementMinutes}
          disabled={disabled}
          aria-label='Increment minutes'
        >
          <Icon icon='RiArrowUpSLine' className='h-3 w-3 text-slate-600' />
        </button>
        <input
          ref={minutesRef}
          type='text'
          inputMode='numeric'
          value={formatTimeValue(time.minutes)}
          onChange={handleInputChange('minutes')}
          className={cn(
            'w-7 border-0 text-center focus:outline-none focus:ring-0 p-0 bg-transparent text-sm',
            disabled && 'cursor-not-allowed'
          )}
          disabled={disabled}
          aria-label='Minutes'
        />
        <button
          type='button'
          className={cn(
            'h-5 w-5 flex items-center justify-center rounded hover:bg-slate-100',
            disabled && 'cursor-not-allowed hover:bg-transparent'
          )}
          onClick={decrementMinutes}
          disabled={disabled}
          aria-label='Decrement minutes'
        >
          <Icon icon='RiArrowDownSLine' className='h-3 w-3 text-slate-600' />
        </button>
      </div>
      <button
        type='button'
        className={cn(
          'text-xs px-2 h-8 rounded-md border border-slate-300 bg-white hover:bg-slate-100',
          'font-medium text-slate-700',
          disabled && 'cursor-not-allowed opacity-50 hover:bg-white'
        )}
        onClick={handleAmPmToggle}
        disabled={disabled}
        aria-label='Toggle AM/PM'
      >
        {time.ampm}
      </button>
    </div>
  );
};

TimeInput.displayName = 'TimeInput';

export { TimeInput };
