import type { IPost } from '@/types';

export interface PostState {
    posts: IPost[];
    post: IPost | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    post: null,
    isLoading: false,
    error: null,
};

export const POST_ACTION_TYPES = {
    SET_POSTS: 'SET_POSTS',
    SET_POST: 'SET_POST',
    ADD_POST: 'ADD_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    ADD_COMMENT: 'ADD_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
};

interface SetPostsAction {
    type: typeof POST_ACTION_TYPES.SET_POSTS;
    payload: IPost[];
}

interface SetPostAction {
    type: typeof POST_ACTION_TYPES.SET_POST;
    payload: IPost | null;
}

interface AddPostAction {
    type: typeof POST_ACTION_TYPES.ADD_POST;
    payload: IPost;
}

interface UpdatePostAction {
    type: typeof POST_ACTION_TYPES.UPDATE_POST;
    payload: IPost;
}

interface DeletePostAction {
    type: typeof POST_ACTION_TYPES.DELETE_POST;
    payload: string;
}

interface AddCommentAction {
    type: typeof POST_ACTION_TYPES.ADD_COMMENT;
    payload: { postId: string; comment: any };
}

interface DeleteCommentAction {
    type: typeof POST_ACTION_TYPES.DELETE_COMMENT;
    payload: { postId: string; commentId: string };
}

interface SetLoadingAction {
    type: typeof POST_ACTION_TYPES.SET_LOADING;
    payload: boolean;
}

interface SetErrorAction {
    type: typeof POST_ACTION_TYPES.SET_ERROR;
    payload: string | null;
}

export type PostAction =
    | SetPostsAction
    | SetPostAction
    | AddPostAction
    | UpdatePostAction
    | DeletePostAction
    | AddCommentAction
    | DeleteCommentAction
    | SetLoadingAction
    | SetErrorAction;

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

