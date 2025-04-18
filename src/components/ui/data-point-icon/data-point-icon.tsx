import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon, IconType } from '../icon';
import { DataPointValueType } from './types';

interface DataPointIconProps {
  dataPointValueType: DataPointValueType;
  icon_url?: string;
  size?: 'sm' | 'lg' | 'xl';
}

const DataPointIcon = React.forwardRef<HTMLDivElement, DataPointIconProps>(({ ...props }, ref) => {
  const TYPES_ICONS_MAP: Record<DataPointValueType, IconType> = {
    attachment: 'RiAttachment2',
    attachments_array: 'RiAttachment2',
    boolean: 'RiCheckboxCircleLine',
    date: 'RiCalendarLine',
    json: 'RiBracesLine',
    number: 'RiHashtag',
    numbers_array: 'RiListOrdered2',
    string: 'RiText',
    strings_array: 'RiListCheck',
    telephone: 'RiPhoneLine'
  };

  const { icon_url, dataPointValueType, size = 'sm' } = props;

  const icon =
    TYPES_ICONS_MAP[dataPointValueType as keyof typeof TYPES_ICONS_MAP] ?? 'RiQuestionFill';

  const color = icon === 'RiQuestionFill' ? 'fill-slate-400' : 'fill-slate-800';

  const SIZES = {
    sm: { icon: 'w-4 h-4', container: 'w-6 h-6' },
    lg: { icon: 'w-6 h-6', container: 'w-9 h-9' },
    xl: { icon: 'w-8 h-8', container: 'w-12 h-12' }
  } as const;

  const iconSize = SIZES[size].icon;
  const containersize = SIZES[size].container;

  if (dataPointValueType === 'attachment' && icon_url) {
    return <img className={`${containersize} rounded-md border border-slate-200`} src={icon_url} />;
  }

  return (
    <div
      ref={ref}
      className={`${containersize} flex bg-slate-100 rounded-md border border-slate-200 items-center justify-center`}
    >
      <Icon icon={icon} className={cn(`${iconSize}`, color)} />
    </div>
  );
});
DataPointIcon.displayName = 'DataPointIcon';

export { DataPointIcon };
