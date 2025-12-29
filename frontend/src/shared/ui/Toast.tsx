import React from "react";
import {cn} from "@/shared/hooks/utils";
import type {ToastType} from "@/shared/hooks/useToast";

type ToastProps = {
    message: string;
    type?: ToastType;
};

export const Toast: React.FC<ToastProps> = ({message, type = "info"}) => {
    const color =
        type === "success"
            ? "bg-emerald-600"
            : type === "error"
                ? "bg-red-600"
                : "bg-slate-700";

    return (
        <div className={cn("fixed top-6 right-6 z-50 text-white px-4 py-3 rounded-lg shadow-lg", color)}>
            {message}
        </div>
    );
};


