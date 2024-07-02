import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const checkboxVariants = cva("", {
  variants: {
    inputSize: {
      md: "w-5 h-5",
      sm: "w-4 h-4",
    },
  },
  defaultVariants: {
    inputSize: "sm",
  },
});

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  helpText?: string;
  type: "radio" | "checkbox";
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  disabled,
  helpText,
  indeterminate = false,
  inputSize,
  type,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current!.indeterminate = indeterminate;
  }, [indeterminate]);

  const boxShadowClass: string = "shadow-[0px_0px_0px_2px_rgb(219,234,254)]";

  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type={type}
          className={cn(
            checkboxVariants({ inputSize }),
            "relative bg-white border border-slate-300 rounded outline-none",
            "flex items-center justify-center",
            "hover:bg-blue-50 hover:border-blue-600",
            `active:border-blue-300 active:${boxShadowClass}`,
            `focus:border-blue-300 focus:${boxShadowClass} focus:ring-transparent`,
            "disabled:!bg-slate-100 disabled:!border-slate-200",
            type === "radio" && "rounded-full",
            className,
          )}
          ref={inputRef}
          disabled={disabled}
          {...props}
        />
        {label && (
          <span
            className={cn(
              "text-slate-700 text-sm font-medium leading-tight",
              disabled && "text-slate-300",
            )}
          >
            {label}
          </span>
        )}
      </label>
      {helpText && (
        <div className="flex gap-2">
          <div className={checkboxVariants({ inputSize })} />
          <span className="text-slate-500 text-sm font-normal">{helpText}</span>
        </div>
      )}
    </div>
  );
};

export { Checkbox };
