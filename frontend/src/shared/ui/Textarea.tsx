import React from 'react';
import {cn} from "@/shared/hooks/utils"

const textareaVariants = {
    default: "w-full bg-slate-700 text-slate-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: keyof typeof textareaVariants;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, variant = 'default', ...props}, ref) => {
        return (
            <textarea
                className={cn(textareaVariants[variant], className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';

export {Textarea};
