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
    actionType: ActionType
    icon_url?: string
}

const ActionIcon = React.forwardRef<HTMLDivElement, ActionIconProps>(
  ({ ...props }, _ref) => {
    const TYPES_ICONS_MAP: Record<
      ActionType,
      { icon: IconType }
    > = {
      [ActionType.ApiCall]: {
        icon: "RiTerminalBoxFill"
      },
      [ActionType.ApiCallGraphql]: {
        icon: "RiTerminalWindowFill"
      },
      [ActionType.Calculation]: {
        icon: "RiCalculatorFill"
      },
      [ActionType.Checklist]: {
        icon: "RiCheckboxMultipleFill"
      },
      [ActionType.ClinicalNote]: {
        icon: "RiHealthBookFill"
      },
      [ActionType.Form]: {
        icon: "RiSurveyFill"
      },
      [ActionType.Message]: {
        icon: "RiMessage3Fill"
      },
      [ActionType.Plugin]: {
        icon: "RiUploadCloudFill"
      },
      [ActionType.PushToEmr]: {
        icon: "RiUploadCloudFill"
      },
    }

    const defaultIconProps = {
      icon: "RiQuestionFill"
    }

    const iconProps =
      TYPES_ICONS_MAP[props.actionType as keyof typeof TYPES_ICONS_MAP] ??
      defaultIconProps

    const color = iconProps.icon === "RiQuestionFill" ? "fill-slate-400" : "fill-slate-800";

    if (props.actionType === ActionType.Plugin && props.icon_url) {
      return (
        <img
          className='w-6 h-6 rounded-md border border-slate-200'
          src={props.icon_url}
        />
      )
    }

    return (
      <div className="w-6 h-6 flex bg-slate-100 rounded-md border border-slate-200 items-center justify-center">
        <Icon {...iconProps} className={cn("w-4 h-4", color)} />
      </div>
    )
  },
)
ActionIcon.displayName = "ActionIcon"

export { ActionIcon }
