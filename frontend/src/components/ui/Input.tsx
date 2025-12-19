import React from 'react';
import { cn } from "@/lib/utils"

const inputVariants = {
    default: "w-full bg-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
    form: "w-full bg-slate-900/50 text-slate-200 rounded-full px-6 py-3 border-2 border-slate-800 shadow-inner shadow-black/40 focus:outline-none focus:border-[#00aaff]/50 placeholder-slate-500",
    auth: "w-full bg-[#2c2c2c] border-none p-4 rounded-full shadow-[inset_5px_5px_10px_#1e1e1e,_inset_-5px_-5px_10px_#3a3a3a] text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#00aaff] transition-shadow",
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: keyof typeof inputVariants;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <input
                className={cn(inputVariants[variant], className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
