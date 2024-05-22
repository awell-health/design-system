import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "badge rounded-2xl",
  {
    variants: {
      variant: {
        default: "bg-slate-100 text-slate-800", 
        primary: "bg-blue-100 text-blue-800",
        error: "bg-red-100 text-red-800",
        warning: "bg-orange-100 text-orange-800",
        success: "bg-green-100 text-green-800",
        yellow: "bg-yellow-100 text-yellow-800",
        lime: "bg-lime-100 text-lime-800",
        cyan: "bg-cyan-100 text-cyan-800",
        teal: "bg-teal-100 text-teal-800",
        violet: "bg-violet-100 text-violet-800",
        pink: "bg-pink-100 text-pink-800"
      },
      size: {
        sm: "badge-sm p-2",
        lg: "badge-lg p-3",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
