import type { Dispatch } from 'redux';
import { apiClient } from '@/apiClient';
import { AUTH_ACTION_TYPES } from '../reducers/authReducer';
import type { IUser } from '@/types';

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
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await apiClient.post('/auth/login', { login, password });
            dispatch(setUser(res.data.user));
            dispatch(setLoading(false));
            return { success: true };
        } catch (e: any) {
            const error = e.response?.data?.error || 'Ошибка авторизации';
            dispatch(setError(error));
            dispatch(setLoading(false));
            return { success: false, error };
        }
    };
};

export const register = (login: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const res = await apiClient.post('/auth/register', { login, password });
            dispatch(setUser(res.data.user));
            dispatch(setLoading(false));
            return { success: true };
        } catch (e: any) {
            const error = e.response?.data?.error || 'Ошибка регистрации';
            dispatch(setError(error));
            dispatch(setLoading(false));
            return { success: false, error };
        }
    };
};

export const checkAuth = () => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await apiClient.get('/auth/me');
            dispatch(setUser(res.data.user));
        } catch {
            dispatch(logout());
        }
    };
};

export const logoutUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            await apiClient.post('/auth/logout');
        } catch (e) {
            console.error('Logout error:', e);
        } finally {
            dispatch(logout());
        }
    };
};

