import type {IPost} from '@/entities/Post/model/types';
import type {IComment} from '@/entities/Comment/model/types';

export interface PostState {
    posts: IPost[];
    post: IPost | null;
    isLoading: boolean;
    error: string | null;
}

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
} as const;

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
    payload: { postId: string; comment: IComment };
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
