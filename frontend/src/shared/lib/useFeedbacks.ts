import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks, deleteFeedback } from '@/app/store/feedback/actions';
import type { RootState, AppDispatch } from '@/app/store';
import { useToast } from '@/shared/lib/useToast';

export const useFeedbacks = () => {
    const dispatch: AppDispatch = useDispatch();
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

    return {
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
    };
};
