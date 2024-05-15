import * as React from "react";
interface Props {
  title: string;
  text?: string;
  children?: JSX.Element | string;
  button?: {
    label: string;
    buttonAction?: () => void;
  };
}

const AlertDialog = (props: Props): React.JSX.Element => {
  const { title, text, button, children = null } = props;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white p-6 pb-8">
              <div>
                <div>
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  {text && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{text}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {children && <div className="pb-8 px-6">{children}</div>}
            {button && (
              <div className="px-6 pb-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3"
                  onClick={button?.buttonAction}
                >
                  {button?.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AlertDialog }
