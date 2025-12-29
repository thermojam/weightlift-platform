import type { AppDispatch } from '@/app/store';
import { apiClient } from '@/shared/api';
import { AUTH_ACTION_TYPES } from './types';
import type { IUser } from '@/entities/User/model/types.ts';

export const setUser = (user: IUser | null) => ({
    type: AUTH_ACTION_TYPES.SET_USER,
    payload: user,
});

export const logout = () => ({
    type: AUTH_ACTION_TYPES.LOGOUT,
});

export const setLoading = (isLoading: boolean) => ({
    type: AUTH_ACTION_TYPES.SET_LOADING,
    payload: isLoading,
});

export const setError = (error: string | null) => ({
    type: AUTH_ACTION_TYPES.SET_ERROR,
    payload: error,
});

export const login = (login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await apiClient.post<{ user: IUser }>('/auth/login', { login, password });
            dispatch(setUser(res.data.user));
            dispatch(setLoading(false));
            return { success: true };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка авторизации';
            dispatch(setError(error));
            dispatch(setLoading(false));
            return { success: false, error };
        }
    };
};

export const register = (login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await apiClient.post<{ user: IUser }>('/auth/register', { login, password });
            dispatch(setUser(res.data.user));
            dispatch(setLoading(false));
            return { success: true };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка регистрации';
            dispatch(setError(error));
            dispatch(setLoading(false));
            return { success: false, error };
        }
    };
};

export const checkAuth = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await apiClient.get<{ user: IUser }>('/auth/me');
            dispatch(setUser(res.data.user));
        } catch {
            dispatch(logout());
        }
    };
};

export const logoutUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            await apiClient.post('/auth/logout');
        } catch (e: unknown) {
            console.error('Logout error:', e);
        } finally {
            dispatch(logout());
        }
    };
};
