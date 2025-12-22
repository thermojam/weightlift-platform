export interface IUser {
    id: string;
    login: string;
    role: string;
    isActive: boolean;
    registeredAt: string;
}

export interface IRole {
    id: number;
    name: string;
}

export interface UserState {
    users: IUser[];
    roles: IRole[];
    isLoading: boolean;
    error: string | null;
}

export const USER_ACTION_TYPES = {
    SET_LOADING: 'user/SET_LOADING',
    SET_ERROR: 'user/SET_ERROR',
    FETCH_USERS_SUCCESS: 'user/FETCH_USERS_SUCCESS',
    FETCH_ROLES_SUCCESS: 'user/FETCH_ROLES_SUCCESS',
    UPDATE_USER_SUCCESS: 'user/UPDATE_USER_SUCCESS',
    DELETE_USER_SUCCESS: 'user/DELETE_USER_SUCCESS',
} as const;

interface SetLoadingAction {
    type: typeof USER_ACTION_TYPES.SET_LOADING;
    payload: boolean;
}

interface SetErrorAction {
    type: typeof USER_ACTION_TYPES.SET_ERROR;
    payload: string | null;
}

interface FetchUsersSuccessAction {
    type: typeof USER_ACTION_TYPES.FETCH_USERS_SUCCESS;
    payload: IUser[];
}

interface FetchRolesSuccessAction {
    type: typeof USER_ACTION_TYPES.FETCH_ROLES_SUCCESS;
    payload: IRole[];
}

interface UpdateUserSuccessAction {
    type: typeof USER_ACTION_TYPES.UPDATE_USER_SUCCESS;
    payload: IUser;
}

interface DeleteUserSuccessAction {
    type: typeof USER_ACTION_TYPES.DELETE_USER_SUCCESS;
    payload: string; // userId
}

export type UserAction =
    | SetLoadingAction
    | SetErrorAction
    | FetchUsersSuccessAction
    | FetchRolesSuccessAction
    | UpdateUserSuccessAction
    | DeleteUserSuccessAction;
