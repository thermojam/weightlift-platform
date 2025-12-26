import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '@/app/store/posts/actions';
import { useDebounce } from '@/shared/lib/useDebounce';
import type { RootState } from '@/app/store';

export const usePosts = (searchQuery: string) => {
    const dispatch = useDispatch();
    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        dispatch(fetchPosts(debouncedSearch) as any);
    }, [dispatch, debouncedSearch]);

    const posts = useSelector((state: RootState) => state.posts.posts);
    const isLoading = useSelector((state: RootState) => state.posts.isLoading);

    return { posts, isLoading };
};
