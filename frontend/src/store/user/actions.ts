import { USER_ACTION_TYPES, type IUser, type IRole } from './types';
import { apiClient } from '@/apiClient';
import type { AppDispatch } from '@/store';

const setLoading = (isLoading: boolean) => ({
    type: USER_ACTION_TYPES.SET_LOADING,
    payload: isLoading,
});

const setError = (error: string | null) => ({
    type: USER_ACTION_TYPES.SET_ERROR,
    payload: error,
});

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiClient.get<{ data: IUser[] }>('/users');
        dispatch({ type: USER_ACTION_TYPES.FETCH_USERS_SUCCESS, payload: response.data.data });
    } catch (e: unknown) {
        const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка загрузки пользователей';
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchRoles = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiClient.get<{ data: IRole[] }>('/users/roles');
        dispatch({ type: USER_ACTION_TYPES.FETCH_ROLES_SUCCESS, payload: response.data.data });
    } catch (e: unknown) {
        const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка загрузки ролей';
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateUser = (id: string, role: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiClient.patch<{ data: IUser }>(`/users/${id}`, { role });
        dispatch({ type: USER_ACTION_TYPES.UPDATE_USER_SUCCESS, payload: response.data.data });
        return { success: true };
    } catch (e: unknown) {
        const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка обновления пользователя';
        dispatch(setError(error));
        return { success: false, error };
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await apiClient.delete(`/users/${id}`);
        dispatch({ type: USER_ACTION_TYPES.DELETE_USER_SUCCESS, payload: id });
        return { success: true };
    } catch (e: unknown) {
        const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка удаления пользователя';
        dispatch(setError(error));
        return { success: false, error };
    } finally {
        dispatch(setLoading(false));
    }
};
