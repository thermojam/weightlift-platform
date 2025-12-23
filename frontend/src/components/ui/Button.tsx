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
    ].join(" "),
    {
        variants: {
            variant: {
                primary: "text-slate-100 btn-skin",
                secondary: "text-slate-300 btn-skin",
                destructive: "text-slate-100 bg-red-500 hover:bg-red-600",
                success: "text-slate-100 bg-green-500 hover:bg-green-600",
                auth: "w-full p-4 border-none rounded-[50px] bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white font-bold cursor-pointer",
                ghost: "text-lg font-bold text-slate-400 hover:text-white transition-colors",
                outline: "border border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white",
                link: "text-[#00aaff] underline-offset-4 hover:underline",
            },
            size: {
                sm: "px-6 py-2 text-sm",
                md: "px-10 py-4 text-base",
                lg: "px-14 py-5 text-lg",
                icon: "px-4 py-3",
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
