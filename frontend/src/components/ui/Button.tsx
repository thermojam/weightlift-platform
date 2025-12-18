import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    [
        "relative inline-flex items-center justify-center",
        "rounded-full font-medium tracking-wide",
        "transition-all duration-500",
        "cursor-pointer",
        "disabled:opacity-50 disabled:pointer-events-none",
        "btn-skin",
    ].join(" "),
    {
        variants: {
            variant: {
                primary: "text-slate-100",
                secondary: "text-slate-300",
            },
            size: {
                sm: "px-6 py-2 text-sm",
                md: "px-10 py-4 text-base",
                lg: "px-14 py-5 text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"
