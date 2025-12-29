import React from "react";
import {Button} from "./Button";
import {cn} from "@/shared/hooks/utils";

type ModalProps = {
    isOpen: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onClose: () => void;
    destructive?: boolean;
    confirmLoading?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                title,
                                                description,
                                                confirmText = "Подтвердить",
                                                cancelText = "Отмена",
                                                onConfirm,
                                                onClose,
                                                destructive,
                                                confirmLoading = false,
                                            }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-md">
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-start gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 transition-colors text-xl leading-none"
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>
                <div className="px-6 py-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={confirmLoading}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={destructive ? "secondary" : "primary"}
                        onClick={onConfirm}
                        disabled={confirmLoading}
                        className={cn(destructive && "bg-red-600 hover:bg-red-500")}
                    >
                        {confirmLoading ? 'Подождите...' : confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};


