import type { IUser } from '@/types';

export interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const AUTH_ACTION_TYPES = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
};

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

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case AUTH_ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: null,
                error: null,
            };
        case AUTH_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case AUTH_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

