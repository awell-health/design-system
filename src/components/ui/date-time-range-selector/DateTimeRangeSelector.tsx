import * as React from 'react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useClickAway } from 'react-use';
import { DayPicker, getDefaultClassNames, type DateRange } from 'react-day-picker';
import {
  addMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isValid,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subHours,
  subMonths,
  subYears
} from 'date-fns';
import { enUS, type Locale } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Input } from '../form/input';
import { Icon } from '../icon';
import { DateTimeInput } from './DateTimeInput';
import { type DateTimeRange, type DateTimeRangeSelectorProps, DEFAULT_PRESETS } from './types';

const formatDateTime = (date: Date | undefined, locale: Locale = enUS): string => {
  if (!date || !isValid(date)) return 'Select date';
  return format(date, 'PP p', { locale });
};

const getDateAdjustedForTimezone = (dateInput: Date | string | undefined): Date | undefined => {
  if (!dateInput) return undefined;
  if (typeof dateInput === 'string') {
    // Handle ISO string format
    return new Date(dateInput);
  }
  return new Date(dateInput);
};

const getTimezoneAbbreviation = (): string => {
  const date = new Date();
  const timezoneName = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName');
  return timezoneName?.value ?? 'Local';
};

const DateTimeRangeSelector: React.FC<DateTimeRangeSelectorProps> = ({
  initialDateFrom,
  initialDateTo,
  onUpdate,
  align = 'start',
  locale = enUS,
  className,
  presets = DEFAULT_PRESETS,
  showPresets = true,
  placeholder = 'Select date range',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateTimeRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: getDateAdjustedForTimezone(initialDateTo)
  });

  const openedRangeRef = useRef<DateTimeRange>(range);
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);
  const [calendarMonths, setCalendarMonths] = useState<[Date, Date]>([
    new Date(),
    addMonths(new Date(), 1)
  ]);

  const ref = useRef(null);
  const defaultClassNames = getDefaultClassNames();

  // Custom styles for day buttons to make them circular
  const calendarStyles = {
    day_button: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      fontWeight: 400,
      transition: 'background-color 0.15s, color 0.15s'
    }
  };

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  const getPresetRange = useCallback((presetName: string): DateTimeRange => {
    const now = new Date();
    const today = startOfDay(now);
    const endToday = endOfDay(now);

    switch (presetName) {
      case 'today':
        return { from: today, to: endToday };
      case 'yesterday': {
        const yesterday = subDays(today, 1);
        return { from: yesterday, to: endOfDay(yesterday) };
      }
      case 'last24hours':
        return { from: subHours(now, 24), to: now };
      case 'last72hours':
        return { from: subHours(now, 72), to: now };
      case 'last7':
        return { from: subDays(today, 6), to: endToday };
      case 'last14':
        return { from: subDays(today, 13), to: endToday };
      case 'last30':
        return { from: subDays(today, 29), to: endToday };
      case 'thisWeek':
        return {
          from: startOfWeek(today, { weekStartsOn: 0 }),
          to: endToday
        };
      case 'lastWeek': {
        const lastWeekStart = startOfWeek(subDays(today, 7), {
          weekStartsOn: 0
        });
        const lastWeekEnd = endOfWeek(lastWeekStart, { weekStartsOn: 0 });
        return {
          from: lastWeekStart,
          to: lastWeekEnd
        };
      }
      case 'thisMonth':
        return {
          from: startOfMonth(today),
          to: endToday
        };
      case 'lastMonth': {
        const lastMonth = subMonths(today, 1);
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        };
      }
      case 'all':
        // 10 years back as "all time"
        return { from: subYears(today, 10), to: endToday };
      default:
        throw new Error(`Unknown date range preset: ${presetName}`);
    }
  }, []);

  const setPreset = (preset: string): void => {
    const newRange = getPresetRange(preset);
    setRange(newRange);
    setSelectedPreset(preset);
    if (newRange.from) {
      setCalendarMonths([newRange.from, addMonths(newRange.from, 1)]);
    }
  };

  const checkPreset = useCallback(() => {
    if (!range.from || !range.to) return;

    for (const preset of presets) {
      try {
        const presetRange = getPresetRange(preset.name);
        if (
          presetRange.from &&
          presetRange.to &&
          isEqual(startOfDay(range.from), startOfDay(presetRange.from)) &&
          isEqual(endOfDay(range.to), endOfDay(presetRange.to))
        ) {
          setSelectedPreset(preset.name);
          return;
        }
      } catch {
        // Unknown preset, skip
      }
    }
    setSelectedPreset(undefined);
  }, [range, getPresetRange, presets]);

  const resetValues = (): void => {
    setRange({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: getDateAdjustedForTimezone(initialDateTo)
    });
    setSelectedPreset(undefined);
    setCalendarMonths([new Date(), addMonths(new Date(), 1)]);
  };

  useEffect(() => {
    checkPreset();
  }, [checkPreset]);

  const areRangesEqual = (a?: DateTimeRange, b?: DateTimeRange): boolean => {
    if (!a || !b) return a === b;
    return (
      isEqual(a.from || new Date(), b.from || new Date()) &&
      isEqual(a.to || new Date(), b.to || new Date())
    );
  };

  // Store the range when the popover opens (not when range changes)
  const prevIsOpenRef = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      // Popover just opened - store the current range
      openedRangeRef.current = range;
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, range]);

  const handleFromDateTimeChange = (date: Date) => {
    setRange((prev) => ({ ...prev, from: date }));
  };

  const handleToDateTimeChange = (date: Date) => {
    setRange((prev) => ({ ...prev, to: date }));
  };

  const handleCalendarSelect = (newRange: DateRange | undefined) => {
    if (newRange) {
      // Preserve time when selecting dates from calendar
      const from = newRange.from
        ? (() => {
            const d = new Date(newRange.from);
            if (range.from) {
              d.setHours(range.from.getHours(), range.from.getMinutes(), range.from.getSeconds());
            }
            return d;
          })()
        : undefined;

      const to = newRange.to
        ? (() => {
            const d = new Date(newRange.to);
            if (range.to) {
              d.setHours(range.to.getHours(), range.to.getMinutes(), range.to.getSeconds());
            } else {
              // Set to end of day for new "to" dates
              d.setHours(23, 59, 59);
            }
            return d;
          })()
        : undefined;

      setRange({ from, to });
    }
  };

  const handleApply = () => {
    setIsOpen(false);
    if (!areRangesEqual(range, openedRangeRef.current)) {
      onUpdate?.({ range });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetValues();
  };

  const getInputValue = (): string => {
    if (!range.from && !range.to) {
      return placeholder;
    }
    const fromStr = formatDateTime(range.from, locale);
    const toStr = range.to ? formatDateTime(range.to, locale) : 'Select date';
    return `${fromStr} → ${toStr}`;
  };

  const alignmentClass =
    align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';

  return (
    <div className='relative w-fit' ref={ref}>
      {/* Trigger Input */}
      <Input
        type='text'
        prefixIcon={<Icon icon='RiCalendarLine' />}
        readOnly
        className={cn(
          'cursor-pointer min-w-[360px] sm:min-w-[420px]',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        onClick={() => !disabled && setIsOpen(true)}
        value={getInputValue()}
        disabled={disabled}
        aria-label='Select date and time range'
        data-testid='date-time-range-selector-trigger'
      />

      {/* Popover Content */}
      <div
        className={cn(
          'absolute top-12 z-50 bg-white',
          'shadow-lg border border-slate-200 rounded-lg',
          'transition-all ease-in-out duration-200',
          alignmentClass,
          {
            'opacity-100 visible scale-100': isOpen,
            'opacity-0 invisible scale-95': !isOpen
          }
        )}
        data-testid='date-time-range-selector-popover'
      >
        <div className='flex'>
          {/* Calendar Section */}
          <div className='space-y-4 p-4'>
            <DayPicker
              mode='range'
              selected={range}
              onSelect={handleCalendarSelect}
              month={calendarMonths[0]}
              onMonthChange={(month) => setCalendarMonths([month, addMonths(month, 1)])}
              numberOfMonths={2}
              styles={calendarStyles}
              classNames={{
                ...defaultClassNames,
                chevron: 'fill-slate-600',
                day_button: 'size-9 rounded-full hover:bg-slate-100 transition-colors',
                today: 'text-blue-600 font-semibold',
                selected: 'bg-blue-500 text-white hover:bg-blue-600',
                range_start: 'bg-blue-500 text-white rounded-l-full',
                range_end: 'bg-blue-500 text-white rounded-r-full',
                range_middle: 'bg-blue-100 rounded-none'
              }}
              data-testid='date-time-range-selector-calendar'
            />

            {/* Date/Time Inputs */}
            <div className='flex items-center gap-4'>
              <DateTimeInput value={range.from} onChange={handleFromDateTimeChange} label='Start' />
              <Icon icon='RiArrowRightLine' className='h-4 w-4 text-slate-400 mt-5' />
              <DateTimeInput value={range.to} onChange={handleToDateTimeChange} label='End' />
            </div>
          </div>

          {/* Presets Section */}
          {showPresets && (
            <div className='border-l border-slate-200 p-4 flex flex-col min-w-[160px]'>
              <h3 className='font-medium text-sm text-slate-700 mb-2'>Presets</h3>
              <div className='flex flex-col gap-0.5'>
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    type='button'
                    className={cn(
                      'flex items-center gap-2 px-2 py-1.5 text-sm text-left rounded-md transition-colors',
                      'hover:bg-slate-100',
                      selectedPreset === preset.name && 'bg-slate-100'
                    )}
                    onClick={() => setPreset(preset.name)}
                  >
                    <Icon
                      icon='RiCheckLine'
                      className={cn(
                        'h-4 w-4 shrink-0',
                        selectedPreset === preset.name ? 'opacity-100 text-blue-500' : 'opacity-0'
                      )}
                    />
                    <span className='whitespace-nowrap'>{preset.label}</span>
                  </button>
                ))}
              </div>
              <div className='mt-auto pt-4 text-xs text-slate-500'>
                Timezone: {getTimezoneAbbreviation()}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className='flex items-center justify-end gap-2 p-4 border-t border-slate-200'>
          <Button variant='secondary' size='sm' onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='primary' size='sm' onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

DateTimeRangeSelector.displayName = 'DateTimeRangeSelector';

export { DateTimeRangeSelector };
