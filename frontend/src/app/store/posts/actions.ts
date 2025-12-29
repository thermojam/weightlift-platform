import type { AppDispatch } from '@/app/store';
import { apiClient } from '@/shared/api';
import { POST_ACTION_TYPES } from './types';
import type { IPost } from '@/entities/Post/model/types';
import type { IComment } from '@/entities/Comment/model/types';

export const setPosts = (posts: IPost[]) => ({
    type: POST_ACTION_TYPES.SET_POSTS,
    payload: posts,
});

export const setPost = (post: IPost | null) => ({
    type: POST_ACTION_TYPES.SET_POST,
    payload: post,
});

export const setLoading = (isLoading: boolean) => ({
    type: POST_ACTION_TYPES.SET_LOADING,
    payload: isLoading,
});

export const setError = (error: string | null) => ({
    type: POST_ACTION_TYPES.SET_ERROR,
    payload: error,
});

export const fetchPosts = (search?: string, limit?: number, page?: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const params: Record<string, string | number> = {};
            if (search) params.search = search;
            if (limit) params.limit = limit;
            if (page) params.page = page;

            const response = await apiClient.get<{ data: { posts: IPost[] } }>('/posts', { params });
            dispatch(setPosts(response.data.data.posts));
            dispatch(setLoading(false));
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка загрузки постов';
            dispatch(setError(error));
            dispatch(setLoading(false));
        }
    };
};

export const fetchPost = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const response = await apiClient.get<{ data: IPost }>(`/posts/${id}`);
            dispatch(setPost(response.data.data));
            dispatch(setLoading(false));
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка загрузки поста';
            dispatch(setError(error));
            dispatch(setLoading(false));
        }
    };
};

export const addPost = (post: Omit<IPost, 'id' | 'comments' | 'publishedAt'>) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await apiClient.post<{ data: IPost }>('/posts', {
                title: post.title,
                content: post.content,
                image: post.imageUrl,
            });
            dispatch({
                type: POST_ACTION_TYPES.ADD_POST,
                payload: response.data.data,
            });
            return { success: true, post: response.data.data };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка создания поста';
            return { success: false, error };
        }
    };
};

export const updatePost = (id: string, post: Omit<IPost, 'id' | 'comments' | 'publishedAt'>) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await apiClient.patch<{ data: IPost }>(`/posts/${id}`, {
                title: post.title,
                content: post.content,
                image: post.imageUrl,
            });
            dispatch({
                type: POST_ACTION_TYPES.UPDATE_POST,
                payload: response.data.data,
            });
            return { success: true, post: response.data.data };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка обновления поста';
            return { success: false, error };
        }
    };
};

export const deletePost = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await apiClient.delete(`/posts/${id}`);
            dispatch({
                type: POST_ACTION_TYPES.DELETE_POST,
                payload: id,
            });
            return { success: true };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка удаления поста';
            return { success: false, error };
        }
    };
};

export const addComment = (postId: string, content: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await apiClient.post<{ data: IComment }>(`/posts/${postId}/comments`, { content });
            dispatch({
                type: POST_ACTION_TYPES.ADD_COMMENT,
                payload: { postId, comment: response.data.data },
            });
            return { success: true };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка добавления комментария';
            return { success: false, error };
        }
    };
};

export const deleteComment = (postId: string, commentId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
            dispatch({
                type: POST_ACTION_TYPES.DELETE_COMMENT,
                payload: { postId, commentId },
            });
            return { success: true };
        } catch (e: unknown) {
            const error = (e as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Ошибка удаления комментария';
            return { success: false, error };
        }
    };
};
