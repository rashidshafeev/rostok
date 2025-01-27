import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold xs:text-sm sm:text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-colGreen text-white hover:bg-colGreen/90 focus-visible:ring-colGreen/50 ",
        secondary: "bg-white text-colBlack border border-colGray hover:bg-colSuperLight focus-visible:ring-colGray/50",
        outline: "bg-transparent text-colGreen border border-colGreen hover:bg-colGreen/10 focus-visible:ring-colGreen/50",
        destructive: "bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500/50",
        ghost: "hover:bg-colGray/10 hover:text-colGreen",
        link: "text-colGreen underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 py-1.5",
        md: "h-10 px-4 py-3",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, isLoading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
