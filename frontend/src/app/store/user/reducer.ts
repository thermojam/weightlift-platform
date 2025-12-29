import {USER_ACTION_TYPES, type UserState, type UserAction} from './types';

const initialState: UserState = {
    users: [],
    roles: [],
    isLoading: false,
    error: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case USER_ACTION_TYPES.SET_LOADING:
            return {...state, isLoading: action.payload};
        case USER_ACTION_TYPES.SET_ERROR:
            return {...state, error: action.payload};
        case USER_ACTION_TYPES.FETCH_USERS_SUCCESS:
            return {...state, users: action.payload};
        case USER_ACTION_TYPES.FETCH_ROLES_SUCCESS:
            return {...state, roles: action.payload};
        case USER_ACTION_TYPES.UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case USER_ACTION_TYPES.DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
        default:
            return state;
    }
};
