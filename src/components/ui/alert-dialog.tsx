import * as React from "react";

import { Icon } from "./icon";
import { Button } from "./button";

interface Props {
  title?: string;
  text?: string;
  children?: JSX.Element | string;
  onClose?: () => void;
  button?: {
    label: string;
    buttonAction?: () => void;
  };
  secondaryButton?: {
    label: string;
    buttonAction?: () => void;
  };
}

const AlertDialog = (props: Props): React.JSX.Element => {
  const {
    title,
    text,
    button,
    children = null,
    onClose,
    secondaryButton,
  } = props;

  return (
    <div
      className="relative z-[9999]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-slate-700 bg-opacity-30 transition-opacity z-[9999]"></div>
      <div className="fixed inset-0 z-[9999] w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
          <div className="relative transform overflow-hiddentransition-all sm:my-8 sm:w-full sm:max-w-lg p-6 bg-white rounded-lg shadow">
            <div className="">
              {onClose && (
                <div
                  className="absolute top-0 right-0 p-4 cursor-pointer text-slate-950"
                  onClick={onClose}
                >
                  <Icon icon="RiCloseLine" />
                </div>
              )}
              {title && (
                <h3
                  className="text-gray-900 text-lg text-gray-900 leading-7"
                  id="modal-title"
                >
                  {title}
                </h3>
              )}
              {text && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">{text}</p>
                </div>
              )}
            </div>
            {children && <div>{children}</div>}
            {button && (
              <div
                className="flex justify-end pt-[32px] gap-3 items-center"
                // FIXME: Using inline style because gap-3 is not working
                style={{ gap: "12px" }}
              >
                {secondaryButton && (
                  <Button
                    variant="secondary"
                    onClick={secondaryButton?.buttonAction}
                  >
                    {secondaryButton.label}
                  </Button>
                )}
                <Button variant="primary" onClick={button?.buttonAction}>
                  {button?.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlertDialog };
