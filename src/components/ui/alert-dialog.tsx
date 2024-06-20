import * as React from "react";

import { Icon, IconSize } from "./icon";
import { Button } from "./button";

interface Props {
  title?: string;
  variant?: "success" | "error" | null;
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
    variant,
    text,
    button,
    children = null,
    onClose,
    secondaryButton,
  } = props;

  function renderVariantIcon(variant: "success" | "error") {
    switch (variant) {
      case "success":
        return (
          <div
            className="flex h-11 w-11 rounded-full bg-green-100 items-center justify-center"
            style={{
              borderRadius: "50%",
              height: "44px",
              width: "44px",
              backgroundColor: "#DCFCE7",
            }}
          >
            <div
              className="flex h-9 w-9 rounded-full bg-green-200 items-center justify-center"
              style={{
                borderRadius: "50%",
                height: "36px",
                width: "36px",
                backgroundColor: "#BBF7D0",
              }}
            >
              <Icon icon="RiCheckLine" color="#16A34A" size={IconSize.l} />
            </div>
          </div>
        );
      case "error":
        return (
          <div
            className="h-11 w-11 rounded-full bg-red-100 items-center justify-center flex"
            style={{
              borderRadius: "50%",
              height: "44px",
              width: "44px",
              backgroundColor: "#FEE2E2",
            }}
          >
            <div
              className="h-9 w-9 rounded-full bg-red-300 items-center justify-center flex"
              style={{
                borderRadius: "50%",
                height: "36px",
                width: "36px",
                backgroundColor: "#FECACA",
              }}
            >
              <Icon icon="RiAlertFill" color="#DC2626" size={IconSize.l} />
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }

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
          <div className="relative transform overflow-hidden transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 bg-white rounded-lg shadow">
            <div className="flex flex-row" style={{ gap: "20px" }}>
              {onClose && (
                <div
                  className="absolute top-0 right-0 p-4 cursor-pointer text-slate-950"
                  onClick={onClose}
                >
                  <Icon icon="RiCloseLine" />
                </div>
              )}
              {variant && renderVariantIcon(variant)}
              <div className="flex flex-col">
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
            </div>
            {children && <div>{children}</div>}
            {(button || secondaryButton) && (
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
                {button && (
                  <Button variant="primary" onClick={button?.buttonAction}>
                    {button?.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlertDialog };
