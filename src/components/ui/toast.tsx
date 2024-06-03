import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Icon } from "./icon";

const toastVariants = cva(
  "toast",
  {
    variants: {
      horizontal: {
        start: "toast-start",
        center: "toast-center",
        end: "toast-end",
      },
      vertical: {
        top: "toast-top",
        middle: "toast-middle",
        bottom: "toast-bottom",
      }
    },
    defaultVariants: {
      horizontal: "center",
      vertical: "bottom",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
      title: string;
      text?: string;
      icon?: JSX.Element;
      handleClose: () => void;
    }

function Toast({ className, horizontal, vertical, handleClose, ...props }: ToastProps) {
  return (
    <div className={cn(toastVariants({ horizontal, vertical }), className)}>
      <div className="p-4 bg-white rounded-lg shadow border border-slate-200 justify-start items-start gap-4 inline-flex max-w-[400px]">

        {props.icon && 
          <div className="relative"> 
            {props.icon}
          </div>
        }
        <div className="w-[400px] flex-col justify-start items-start">
          <div className="text-slate-900 text-sm font-medium leading-tight whitespace-normal overflow-auto max-w-[326px]">
            {props.title}
          </div>
          <div className="text-slate-500 text-sm leading-tight whitespace-normal overflow-aut">
            {props.text}
          </div>
        </div>

        <div role="button" onClick={handleClose}>
          <Icon icon="RiCloseFill" className="fill-slate-400"/>
        </div>
      </div>
    </div>
  )
}

export { Toast, toastVariants }
