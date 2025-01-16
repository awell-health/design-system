import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon, IconType } from '../icon';
import { ActionType } from './types';

interface ActionIconProps {
  actionType?: ActionType;
  icon_url?: string;
  size?: 'sm' | 'lg' | 'xl';
}

const ActionIcon = React.forwardRef<HTMLDivElement, ActionIconProps>(({ ...props }, ref) => {
  const TYPES_ICONS_MAP: Record<ActionType, IconType> = {
    [ActionType.ApiCall]: 'RiTerminalBoxFill',
    [ActionType.ApiCallGraphql]: 'RiTerminalWindowFill',
    [ActionType.Calculation]: 'RiCalculatorFill',
    [ActionType.Checklist]: 'RiCheckboxMultipleFill',
    [ActionType.ClinicalNote]: 'RiHealthBookFill',
    [ActionType.Form]: 'RiSurveyFill',
    [ActionType.Message]: 'RiMessage3Fill',
    [ActionType.Plugin]: 'RiUploadCloudFill',
    [ActionType.PushToEmr]: 'RiUploadCloudFill'
  };

  const { icon_url, actionType, size = 'sm' } = props;

  const icon = TYPES_ICONS_MAP[actionType as keyof typeof TYPES_ICONS_MAP] ?? 'RiQuestionFill';

  const color = icon === 'RiQuestionFill' ? 'fill-slate-400' : 'fill-slate-800';

  const SIZES = {
    sm: { icon: 'w-4 h-4', container: 'w-6 h-6' },
    lg: { icon: 'w-6 h-6', container: 'w-9 h-9' },
    xl: { icon: 'w-8 h-8', container: 'w-12 h-12' }
  } as const;

  const iconSize = SIZES[size].icon;
  const containersize = SIZES[size].container;

  if (actionType === ActionType.Plugin && icon_url) {
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
ActionIcon.displayName = 'ActionIcon';

export { ActionIcon };
