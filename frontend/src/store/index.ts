import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    type AnyAction,
    type Store,
    type StoreEnhancer
} from 'redux';
import type {ThunkDispatch} from 'redux-thunk';
import {thunk} from 'redux-thunk';
import {authReducer, type AuthState, type AuthAction} from './reducers/authReducer';
// import {postReducer, type PostState, type PostAction} from './reducers/postReducer';

export interface RootState {
    auth: AuthState;
    // posts: PostState;
}

export type RootAction = AuthAction | PostAction;

const rootReducer = combineReducers({
    auth: authReducer,
    // posts: postReducer,
}) as (state: RootState | undefined, action: RootAction) => RootState;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk)) as StoreEnhancer<{}, {}>;

export const store: Store<RootState, RootAction> = createStore<RootState, RootAction, {}, {}>(
    rootReducer,
    enhancer
);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

