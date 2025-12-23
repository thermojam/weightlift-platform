import React from "react";
import { cn } from "@/lib/utils";

type LoaderProps = {
    size?: "sm" | "md" | "lg";
    className?: string;
    label?: string;
};

const sizeMap: Record<NonNullable<LoaderProps["size"]>, string> = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
};

export const Loader: React.FC<LoaderProps> = ({ size = "md", className, label }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-none">
            <div className={cn("flex flex-col items-center gap-2 text-slate-300", className)}>
                <div
                    className={cn(
                        "rounded-full border-4 border-slate-600 border-t-[#00aaff] animate-spin",
                        sizeMap[size]
                    )}
                />
                {label && <span className="text-sm text-slate-400">{label}</span>}
            </div>
        </div>
    );
};
