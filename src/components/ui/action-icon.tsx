import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon, IconType } from "./icon"


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
    actionType?: ActionType
    icon_url?: string
    size?: "sm" | "lg"
}

const ActionIcon = React.forwardRef<HTMLDivElement, ActionIconProps>(
  ({ ...props }, _ref) => {
    const TYPES_ICONS_MAP: Record<
      ActionType,
      IconType
    > = {
      [ActionType.ApiCall]: "RiTerminalBoxFill",
      [ActionType.ApiCallGraphql]: "RiTerminalWindowFill",
      [ActionType.Calculation]: "RiCalculatorFill",
      [ActionType.Checklist]: "RiCheckboxMultipleFill",
      [ActionType.ClinicalNote]:  "RiHealthBookFill",
      [ActionType.Form]: "RiSurveyFill",
      [ActionType.Message]: "RiMessage3Fill",
      [ActionType.Plugin]: "RiUploadCloudFill",
      [ActionType.PushToEmr]: "RiUploadCloudFill"
    }

    const { icon_url, actionType, size='sm' } = props

    const icon =
      TYPES_ICONS_MAP[actionType as keyof typeof TYPES_ICONS_MAP] ??
      "RiQuestionFill"

    const color = icon === "RiQuestionFill" ? "fill-slate-400" : "fill-slate-800";
    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'
    const containersize = size === 'sm' ? 'w-6 h-6' : 'w-9 h-9'

    if (actionType === ActionType.Plugin && icon_url) {
      return (
        <img
          className={`${containersize} rounded-md border border-slate-200`}
          src={icon_url}
        />
      )
    }

    return (
      <div className={`${containersize} flex bg-slate-100 rounded-md border border-slate-200 items-center justify-center`}>
        <Icon icon={icon} className={cn(`${iconSize}`, color)} />
      </div>
    )
  },
)
ActionIcon.displayName = "ActionIcon"

export { ActionIcon }
