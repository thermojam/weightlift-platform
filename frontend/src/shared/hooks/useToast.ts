import {useCallback, useState} from "react";

export type ToastType = "info" | "success" | "error";

export function useToast() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        setToast({message, type});
        setTimeout(() => setToast(null), 3000);
    }, []);

    const hideToast = useCallback(() => setToast(null), []);

    return {toast, showToast, hideToast};
}


