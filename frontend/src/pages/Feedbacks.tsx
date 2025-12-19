import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaUser, FaFileAlt, FaChartBar, FaEnvelope, FaTrash } from 'react-icons/fa';
import { fetchFeedbacks, deleteFeedback } from '@/store/feedback/actions';
import type { IFeedback } from '@/store/feedback/types';
import type { RootState, AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';

export const Feedbacks: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { feedbacks, isLoading, error } = useSelector((state: RootState) => state.feedback);
    const [confirmId, setConfirmId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast, showToast } = useToast();

    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            showToast(error, 'error');
        }
    }, [error, showToast]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getDisciplineName = (discipline: string) => {
        return discipline === 'weightlifting' ? 'Weightlifting' : 'Powerlifting';
    };

    const getGenderName = (gender: string) => {
        return gender === 'male' ? 'Мужской' : 'Женский';
    };

    const handleDeleteConfirm = async () => {
        if (!confirmId) return;
        setIsDeleting(true);
        const result = await dispatch(deleteFeedback(confirmId));
        if (result.success) {
            showToast('Заявка удалена', 'success');
        } else if (result.error) {
            showToast(result.error, 'error');
        }
        setIsDeleting(false);
        setConfirmId(null);
    };

    if (isLoading && feedbacks.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <Loader label="Загружаем заявки..." />
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-160px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 p-6 flex flex-col gap-4 border-r border-slate-700">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-100 hover:text-slate-300 transition-colors mb-4"
                >
                    <FaArrowLeft size={16} />
                </button>

                <div className="text-slate-100 mb-2 text-sm">Профиль</div>

                <button
                    onClick={() => navigate('/users')}
                    className="flex items-center gap-2 text-slate-100 hover:text-slate-300 transition-colors text-left"
                >
                    <FaUser size={16} />
                    <span>Пользователи</span>
                </button>

                <div className="bg-slate-700 rounded-lg p-3 text-slate-100 font-semibold">
                    Заявки
                </div>

                <button
                    onClick={() => navigate('/post')}
                    className="flex items-center gap-2 text-slate-100 hover:text-slate-300 transition-colors text-left"
                >
                    <FaFileAlt size={16} />
                    <span>Создать статью</span>
                </button>

                <button className="flex items-center gap-2 text-slate-100 hover:text-slate-300 transition-colors text-left">
                    <FaChartBar size={16} />
                    <span>Статистика</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-slate-900">
                <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Заявки обратной связи</h1>

                <div className="space-y-4 max-w-6xl mx-auto">
                    {feedbacks.length === 0 && !isLoading ? (
                        <div className="text-center text-slate-400 py-8">
                            <FaEnvelope size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Заявок пока нет</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-6 gap-4 px-4 text-[#00aaff] font-semibold text-sm">
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
                                    className="bg-slate-800 border border-[#00aaff] rounded-lg p-4 grid grid-cols-6 gap-4 items-center"
                                >
                                    <div className="text-slate-100 font-medium">{feedback.fullName}</div>
                                    <div className="text-slate-100">{feedback.phone}</div>
                                    <div className="text-slate-100">{feedback.city}</div>
                                    <div className="text-slate-100">{getDisciplineName(feedback.discipline)}</div>
                                    <div className="text-slate-100 text-sm">
                                        <div>{feedback.height} см</div>
                                        <div>{feedback.weight} кг</div>
                                        <div>{getGenderName(feedback.gender)}</div>
                                    </div>
                                    <div className="flex items-center justify-end gap-4 text-sm">
                                        <div className="text-slate-400">{formatDate(feedback.createdAt)}</div>
                                        <button
                                            onClick={() => setConfirmId(feedback.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                                            title="Удалить заявку"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </main>
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
        </div>
    );
};
