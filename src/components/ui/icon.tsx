import * as React from "react";
import {
  RiArrowUpSLine,
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownFill,
  RiThumbDownLine,
  RiLineChartLine,
  RiStickyNote2Fill,
  RiDeleteBinLine,
  RiDraggable,
  RiPuzzleFill,
  RiPriceTag3Fill,
  RiEdit2Fill,
  RiFileCopyFill,
  RiBookmarkLine,
  RiDeleteBin6Fill,
  RiMore2Line,
  RiCloseLargeLine,
  RiLayout3Line,
  RiTerminalBoxFill,
  RiTerminalWindowFill,
  RiCalculatorFill,
  RiCheckboxMultipleFill,
  RiHealthBookFill,
  RiSurveyFill,
  RiMessage3Fill,
  RiQuestionFill,
  RiAlertFill,
  RiArrowDropRightLine,
  RiArrowLeftRightFill,
  RiArrowDownSLine,
  RiArrowUpLine,
  RiAddFill,
  RiErrorWarningLine,
  RiAccountPinBoxFill,
  RiDeleteBinFill,
  RiCloseLine,
  RiCloseFill,
  RiCursorFill,
  RiNodeTree,
  RiSearchLine,
  RiContractRightLine,
  RiErrorWarningFill,
  RiInformation2Fill,
  RiCheckboxFill,
  RiUploadCloudFill,
  RiPlayFill,
  RiStopCircleFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSparklingFill,
  RiExternalLinkLine,
  RiCheckFill,
  RiCheckLine,
} from "@remixicon/react";

const ICONS = {
  RiArrowUpSLine,
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownFill,
  RiThumbDownLine,
  RiLineChartLine,
  RiStickyNote2Fill,
  RiDeleteBinLine,
  RiDraggable,
  RiPuzzleFill,
  RiPriceTag3Fill,
  RiEdit2Fill,
  RiFileCopyFill,
  RiBookmarkLine,
  RiDeleteBin6Fill,
  RiMore2Line,
  RiCloseLargeLine,
  RiLayout3Line,
  RiTerminalBoxFill,
  RiTerminalWindowFill,
  RiCalculatorFill,
  RiCheckboxMultipleFill,
  RiHealthBookFill,
  RiSurveyFill,
  RiMessage3Fill,
  RiQuestionFill,
  RiAlertFill,
  RiArrowDropRightLine,
  RiArrowLeftRightFill,
  RiArrowDownSLine,
  RiArrowUpLine,
  RiAddFill,
  RiErrorWarningLine,
  RiAccountPinBoxFill,
  RiDeleteBinFill,
  RiCloseLine,
  RiCloseFill,
  RiCursorFill,
  RiNodeTree,
  RiSearchLine,
  RiContractRightLine,
  RiErrorWarningFill,
  RiInformation2Fill,
  RiCheckboxFill,
  RiUploadCloudFill,
  RiPlayFill,
  RiStopCircleFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSparklingFill,
  RiExternalLinkLine,
  RiCheckFill,
  RiCheckLine,
};

export enum IconSize {
  xs = 16,
  s = 20,
  m = 24,
  l = 28,
  xl = 32,
}

export type IconType = keyof typeof ICONS;

interface Props {
  icon: IconType;
  size?: IconSize;
  color?: string;
  className?: string;
}

const Icon = (props: Props): React.JSX.Element => {
  const {
    icon,
    color = "default",
    className = "inline",
    size = IconSize.m,
  } = props;

  const IconComponent = ICONS[icon];

  return <IconComponent size={size} color={color} className={className} />;
};

export { Icon };
