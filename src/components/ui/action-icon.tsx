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
    
    const { icon_url, actionType } = props

    const icon =
      TYPES_ICONS_MAP[actionType as keyof typeof TYPES_ICONS_MAP] ??
      "RiQuestionFill"

    const color = icon === "RiQuestionFill" ? "fill-slate-400" : "fill-slate-800";

    if (actionType === ActionType.Plugin && icon_url) {
      return (
        <img
          className='w-6 h-6 rounded-md border border-slate-200'
          src={icon_url}
        />
      )
    }

    return (
      <div className="w-6 h-6 flex bg-slate-100 rounded-md border border-slate-200 items-center justify-center">
        <Icon icon={icon} className={cn("w-4 h-4", color)} />
      </div>
    )
  },
)
ActionIcon.displayName = "ActionIcon"

export { ActionIcon }
