import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost, deletePost } from '@/app/store/posts/actions.ts';
import { isAdminOrModerator } from '@/shared/hooks/permissions.ts';
import { useToast } from '@/shared/hooks/useToast.ts';
import type { RootState } from '@/app/store';

export const usePost = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user);
    const post = useSelector((state: RootState) => state.posts.post);
    const isLoading = useSelector((state: RootState) => state.posts.isLoading);
    const error = useSelector((state: RootState) => state.posts.error);

    const { toast, showToast } = useToast();
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchPost(id) as any);
        }
    }, [id, dispatch]);

    const handleEdit = () => {
        navigate(`/post/${id}/edit`);
    };

    const handleDelete = async () => {
        if (!id) return;
        const result = await dispatch(deletePost(id) as any);
        if (result.success) {
            showToast('Статья удалена', 'success');
            navigate('/posts');
        } else if (result.error) {
            showToast(result.error, 'error');
        }
    };

    const canEdit = isAdminOrModerator(user?.role);

    return {
        post,
        isLoading,
        error,
        toast,
        confirmOpen,
        canEdit,
        setConfirmOpen,
        handleEdit,
        handleDelete,
    };
};
