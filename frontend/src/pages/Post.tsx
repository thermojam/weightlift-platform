import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';
import { Comments } from '@/components/Comments';
import { fetchPost, deletePost } from '@/store/posts/actions';
import { isAdminOrModerator } from '@/utils/permissions';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import type { RootState } from '@/store';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const post = useSelector((state: RootState) => state.posts.post);
    const isLoading = useSelector((state: RootState) => state.posts.isLoading);
    const error = useSelector((state: RootState) => state.posts.error);
    const dispatch = useDispatch();
    const { toast, showToast } = useToast();
    const [confirmOpen, setConfirmOpen] = React.useState(false);

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
            navigate('/');
        } else if (result.error) {
            showToast(result.error, 'error');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                <Loader label="Загружаем статью..." />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-400 py-12">{error}</div>;
    }

    if (!post) {
        return <div className="text-center text-slate-400 py-12">Статья не найдена</div>;
    }

    const canEdit = isAdminOrModerator(user?.role);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-slate-800 rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-slate-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
                    {canEdit && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleEdit}
                                className="text-[#00aaff] hover:text-[#0088cc] transition-colors p-1"
                                title="Редактировать"
                            >
                                <FaEdit size={24} />
                            </button>
                            <button
                                onClick={() => setConfirmOpen(true)}
                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                title="Удалить"
                            >
                                <FaTrash size={20} />
                            </button>
                        </div>
                    )}
                </div>
                <img src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover rounded-t-lg mb-8" />
                <h1 className="text-4xl font-bold text-slate-100 mb-4">{post.title}</h1>
                <div
                    className="text-slate-300 prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                />
            </div>
            <Comments comments={post.comments} postId={post.id} />
            <Modal
                isOpen={confirmOpen}
                title="Удаление статьи"
                description="Вы уверены, что хотите удалить эту статью?"
                confirmText="Удалить"
                cancelText="Отмена"
                destructive
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    setConfirmOpen(false);
                    handleDelete();
                }}
            />
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};
