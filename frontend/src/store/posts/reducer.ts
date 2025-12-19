import type {PostState, PostAction} from './types';
import {POST_ACTION_TYPES} from './types';

const initialState: PostState = {
    posts: [],
    post: null,
    isLoading: false,
    error: null,
};

export const postReducer = (state = initialState, action: PostAction): PostState => {
    switch (action.type) {
        case POST_ACTION_TYPES.SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                error: null,
            };
        case POST_ACTION_TYPES.SET_POST:
            return {
                ...state,
                post: action.payload,
                error: null,
            };
        case POST_ACTION_TYPES.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case POST_ACTION_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((p) => (p.id === action.payload.id ? action.payload : p)),
                post: state.post?.id === action.payload.id ? action.payload : state.post,
            };
        case POST_ACTION_TYPES.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.payload),
                post: state.post?.id === action.payload ? null : state.post,
            };
        case POST_ACTION_TYPES.ADD_COMMENT:
            if (state.post?.id === action.payload.postId) {
                return {
                    ...state,
                    post: {
                        ...state.post,
                        comments: [...state.post.comments, action.payload.comment],
                    },
                };
            }
            return state;
        case POST_ACTION_TYPES.DELETE_COMMENT:
            if (state.post?.id === action.payload.postId) {
                return {
                    ...state,
                    post: {
                        ...state.post,
                        comments: state.post.comments.filter(
                            (c) => c.id !== action.payload.commentId
                        ),
                    },
                };
            }
            return state;
        case POST_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case POST_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
