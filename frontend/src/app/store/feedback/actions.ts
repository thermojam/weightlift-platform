import { apiClient } from '@/shared/api'
import type { AppDispatch } from '@/app/store';
import { FEEDBACK_ACTION_TYPES, type IFeedback } from './types';

const setLoading = (isLoading: boolean) => ({
    type: FEEDBACK_ACTION_TYPES.SET_LOADING,
    payload: isLoading,
});

const setError = (error: string | null) => ({
    type: FEEDBACK_ACTION_TYPES.SET_ERROR,
    payload: error,
});

export const fetchFeedbacks = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiClient.get<{ data: IFeedback[] }>('/feedback');
        dispatch({ type: FEEDBACK_ACTION_TYPES.FETCH_FEEDBACKS_SUCCESS, payload: response.data.data });
    } catch (e: unknown) {
        const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка загрузки заявок';
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteFeedback = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await apiClient.delete(`/feedback/${id}`);
        dispatch({ type: FEEDBACK_ACTION_TYPES.DELETE_FEEDBACK_SUCCESS, payload: id });
        return { success: true };
    } catch (e: unknown) {
        const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка удаления заявки';
        dispatch(setError(error)); // Dispatch error to store
        return { success: false, error };
    }
};
