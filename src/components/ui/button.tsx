import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "btn",
  {
    variants: {
      // keep for backward capabilites
      variant: {
         "bg-primary text-primary-foreground shadow hover:bg-primary/90",
       destructive:
         "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
       outline:
         "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
       secondary:
         "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
       ghost: "hover:bg-accent hover:text-accent-foreground",
       link: "text-primary underline-offset-4 hover:underline",
       // --- end
        default: "",
        primary: "btn-primary text-green asd asdad",
        secondary: "btn-secondary",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
        info: "btn-info",
        lightBlue: "bg-blue-200 text-blue-600 rounded-xl"
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
