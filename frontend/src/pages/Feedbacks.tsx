import React from 'react';
import { FaEnvelope, FaTrash } from 'react-icons/fa';
import type { IFeedback } from '@/app/store/feedback/types';
import { Loader } from '@/shared/ui/Loader';
import { Modal } from '@/shared/ui/Modal';
import { Toast } from '@/shared/ui/Toast';
import { AdminLayout } from '@/widgets/AdminLayout';
import { useFeedbacks } from '@/shared/hooks/useFeedbacks';

export const Feedbacks: React.FC = () => {
    const {
        feedbacks,
        isLoading,
        toast,
        confirmId,
        isDeleting,
        setConfirmId,
        handleDeleteConfirm,
        formatDate,
        getDisciplineName,
        getGenderName,
    } = useFeedbacks();

    if (isLoading && feedbacks.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <Loader label="Загружаем заявки..." />
            </div>
        );
    }

    return (
        <AdminLayout>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 mb-6 sm:mb-8 text-center">Заявки обратной связи</h1>

            <div className="space-y-4 max-w-6xl mx-auto px-2 sm:px-0">
                {feedbacks.length === 0 && !isLoading ? (
                    <div className="text-center text-slate-400 py-8">
                        <FaEnvelope size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Заявок пока нет</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Headers */}
                        <div className="hidden lg:grid grid-cols-6 gap-2 px-2 text-[#00aaff] font-semibold text-sm">
                            <div>Имя</div>
                            <div>Телефон</div>
                            <div>Город</div>
                            <div>Дисциплина</div>
                            <div>Рост / Вес / Пол</div>
                            <div className="text-right">Действия</div>
                        </div>
                        {feedbacks.map((feedback: IFeedback) => (
                            <div
                                key={feedback.id}
                                className="p-4 rounded-lg bg-cyan-950 lg:grid lg:grid-cols-6 lg:gap-2 lg:items-center text-sm"
                            >
                                <div className="flex justify-between items-center lg:block">
                                    <span className="lg:hidden text-[#00aaff] font-semibold">Имя</span>
                                    <div className="text-slate-100 font-medium text-right lg:text-left">{feedback.fullName}</div>
                                </div>

                                <div className="flex justify-between items-center lg:block mt-2 pt-2 border-t border-slate-700/50 lg:border-none lg:mt-0 lg:pt-0">
                                    <span className="lg:hidden text-[#00aaff] font-semibold">Телефон</span>
                                    <div className="text-slate-100 text-right lg:text-left">{feedback.phone}</div>
                                </div>

                                <div className="flex justify-between items-center lg:block mt-2 pt-2 border-t border-slate-700/50 lg:border-none lg:mt-0 lg:pt-0">
                                    <span className="lg:hidden text-[#00aaff] font-semibold">Город</span>
                                    <div className="text-slate-100 text-right lg:text-left">{feedback.city}</div>
                                </div>

                                <div className="flex justify-between items-center lg:block mt-2 pt-2 border-t border-slate-700/50 lg:border-none lg:mt-0 lg:pt-0">
                                    <span className="lg:hidden text-[#00aaff] font-semibold">Дисциплина</span>
                                    <div className="text-slate-100 text-right lg:text-left">{getDisciplineName(feedback.discipline)}</div>
                                </div>

                                <div className="flex justify-between items-start lg:block mt-2 pt-2 border-t border-slate-700/50 lg:border-none lg:mt-0 lg:pt-0">
                                    <span className="lg:hidden text-[#00aaff] font-semibold">Параметры</span>
                                    <div className="text-slate-100 text-right lg:text-left">
                                        <div>{feedback.height} см</div>
                                        <div>{feedback.weight} кг</div>
                                        <div>{getGenderName(feedback.gender)}</div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center lg:justify-end lg:gap-4 mt-4 pt-3 border-t border-slate-700 lg:border-none lg:mt-0 lg:pt-0">
                                    <span className="lg:hidden text-[#00aaff] font-semibold">Инфо</span>
                                    <div className="flex items-center gap-4">
                                        <div className="text-slate-400 text-xs sm:text-sm">{formatDate(feedback.createdAt)}</div>
                                        <button
                                            onClick={() => setConfirmId(feedback.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                                            title="Удалить заявку"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <Modal
                isOpen={!!confirmId}
                title="Удаление заявки"
                description="Вы уверены, что хотите удалить эту заявку?"
                confirmText="Удалить"
                cancelText="Отмена"
                destructive
                confirmLoading={isDeleting}
                onClose={() => setConfirmId(null)}
                onConfirm={handleDeleteConfirm}
            />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </AdminLayout>
    );
};
