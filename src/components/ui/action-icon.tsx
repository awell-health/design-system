import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon, IconType } from "./icon";


export enum ActionType {
  ApiCall = "API_CALL",
  ApiCallGraphql = "API_CALL_GRAPHQL",
  Calculation = "CALCULATION",
  Checklist = "CHECKLIST",
  ClinicalNote = "CLINICAL_NOTE",
  Form = "FORM",
  Message = "MESSAGE",
  Plugin = "PLUGIN",
  PushToEmr = "PUSH_TO_EMR",
}

export interface ActionIconProps {
    actionType: ActionType
}

const ActionIcon = React.forwardRef<HTMLDivElement, ActionIconProps>(
  ({ ...props }, ref) => {
    const TYPES_ICONS_MAP: Record<
      ActionType,
      { icon: IconType; className: string }
    > = {
      [ActionType.ApiCall]: {
        icon: "RiTerminalBoxFill",
        className: "fill-slate-800",
      },
      [ActionType.ApiCallGraphql]: {
        icon: "RiTerminalWindowFill",
        className: "fill-slate-800",
      },
      [ActionType.Calculation]: {
        icon: "RiCalculatorFill",
        className: "fill-slate-800",
      },
      [ActionType.Checklist]: {
        icon: "RiCheckboxMultipleFill",
        className: "fill-slate-800",
      },
      [ActionType.ClinicalNote]: {
        icon: "RiHealthBookFill",
        className: "fill-slate-800",
      },
      [ActionType.Form]: {
        icon: "RiSurveyFill",
        className: "fill-slate-800",
      },
      [ActionType.Message]: {
        icon: "RiMessage3Fill",
        className: "fill-slate-800",
      },
      [ActionType.Plugin]: {
        icon: "RiQuestionFill",
        className: "fill-slate-400",
      },
      [ActionType.PushToEmr]: {
        icon: "RiQuestionFill",
        className: "fill-slate-400",
      },
    };

    const defaultIconProps = {
      icon: "RiQuestionFill",
      className: "fill-slate-400",
    };

    const iconProps =
      TYPES_ICONS_MAP[actionType as keyof typeof TYPES_ICONS_MAP] ??
      defaultIconProps;

    return (
      <div className="w-6 h-6 flex bg-slate-100 rounded-md border border-slate-200 items-center justify-center">
        <Icon {...iconProps} className={cn("w-4 h-4", iconProps.className)} />
      </div>
    );
  },
);
ActionIcon.displayName = "ActionIcon";

export { ActionIcon };
