import * as React from "react";

import { cn } from "@/lib/utils";

export interface Checkbox extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  inputSize?: "xs" | "sm" | "md" | "lg";
  helpText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, Checkbox>(
  ({
    className,
    label,
    disabled,
    helpText,
    inputSize = "sm",
    indeterminate = false,
    ...props
  }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      inputRef.current!.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <div className="form-control">
        <label className="label cursor-pointer flex justify-start items-start gap-2">
          <input
            id="test"
            type="checkbox"
            disabled={disabled}
            className={cn(
              "checkbox border-slate-300 mt-1",
              !disabled && "checkbox-primary",
              "hover:bg-blue-50 hover:border-blue-600",
              "focused:shadow focused:border-blue-300",
              "active:border-blue-300 active:shadow-[0px_0px_0px_2px_rgb(219,234,254)]",
              inputSize === "lg" && "checkbox-lg rounded-lg",
              inputSize === "md" && "checkbox-md rounded-md",
              inputSize === "sm" && "checkbox-sm rounded",
              inputSize === "xs" && "checkbox-xs rounded",
              className,
            )}
            {...props}
            ref={inputRef}
          />
          <div>
            <span
              className={cn(
                "label-text text-slate-700 text-sm font-medium",
                disabled && "text-slate-300",
              )}
            >
              {label}
            </span>
            {helpText && (
              <div className="text-slate-500 text-sm font-normal">
                {helpText}
              </div>
            )}
          </div>
        </label>
      </div>
    );
  },
);

export { Checkbox };
