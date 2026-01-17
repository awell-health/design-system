import type { Locale } from 'date-fns/locale';

export interface DateTimeRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface Preset {
  name: string;
  label: string;
}

export const DEFAULT_PRESETS: Preset[] = [
  { name: 'today', label: 'Today' },
  { name: 'last24hours', label: 'Last 24 hours' },
  { name: 'last72hours', label: 'Last 72 hours' },
  { name: 'last7', label: 'Last 7 days' },
  { name: 'last30', label: 'Last 30 days' },
  { name: 'all', label: 'All time' }
];

export interface DateTimeRangeSelectorProps {
  /** Callback when the date range is updated */
  onUpdate?: (values: { range: DateTimeRange }) => void;
  /** Initial from date (Date object or ISO string) */
  initialDateFrom?: Date | string;
  /** Initial to date (Date object or ISO string) */
  initialDateTo?: Date | string;
  /** Alignment of the popover */
  align?: 'start' | 'center' | 'end';
  /** Locale for date formatting */
  locale?: Locale;
  /** Additional CSS classes */
  className?: string;
  /** Custom presets to show (defaults to common presets) */
  presets?: Preset[];
  /** Whether to show presets panel */
  showPresets?: boolean;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
}

export interface DateInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  className?: string;
}

export interface TimeInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  className?: string;
}

export interface DateTimeInputProps {
  value?: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}
