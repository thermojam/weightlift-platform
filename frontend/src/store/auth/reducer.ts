import type { AuthState, AuthAction } from './types';
import { AUTH_ACTION_TYPES } from './types';

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

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
