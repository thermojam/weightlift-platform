import type { IUser } from '@/entities/User/model/types';

export interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
}

export const AUTH_ACTION_TYPES = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
} as const;

interface SetUserAction {
    type: typeof AUTH_ACTION_TYPES.SET_USER;
    payload: IUser | null;
}

interface LogoutAction {
    type: typeof AUTH_ACTION_TYPES.LOGOUT;
}

interface SetLoadingAction {
    type: typeof AUTH_ACTION_TYPES.SET_LOADING;
    payload: boolean;
}

interface SetErrorAction {
    type: typeof AUTH_ACTION_TYPES.SET_ERROR;
    payload: string | null;
}

export type AuthAction = SetUserAction | LogoutAction | SetLoadingAction | SetErrorAction;
