import { createStore, combineReducers, applyMiddleware, compose, type AnyAction, type Store, type Action, type Reducer } from 'redux';
import { useDispatch } from 'react-redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { thunk } from 'redux-thunk';
import { authReducer } from './auth/reducer';
import type { AuthState, AuthAction } from './auth/types';
import { postReducer } from './posts/reducer';
import type { PostState, PostAction } from './posts/types';
import { userReducer } from './user/reducer';
import type { UserState, UserAction } from './user/types';
import { feedbackReducer } from './feedback/reducer';
import type { IFeedbackState } from './feedback/types';
import { diaryReducer } from './diary/reducer';
import type { DiaryState, DiaryActionTypes } from './diary/types';

export interface RootState {
    auth: AuthState;
    posts: PostState;
    user: UserState;
    feedback: IFeedbackState;
    diary: DiaryState;
}

export type RootAction = AuthAction | PostAction | UserAction | DiaryActionTypes | AnyAction | Action;

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
    user: userReducer,
    feedback: feedbackReducer,
    diary: diaryReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store: Store<RootState, RootAction> = createStore(
    rootReducer as unknown as Reducer<RootState, RootAction>,
    enhancer
);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;
