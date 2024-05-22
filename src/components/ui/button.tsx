import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        default: "",
        primary: "btn-primary text-green",
        secondary: "btn-secondary",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
        ghost: "btn-ghost",
        link: "btn-link",
      },
      size: {
        default: "",
        xs: "btn-xs rounded-xs",
        sm: "btn-sm rounded-sm",
        lg: "btn-lg rounded-lg"
      },
      shape: {
        circle: "btn-circle",
        square: "btn-square"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
