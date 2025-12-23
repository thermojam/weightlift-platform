import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { IComment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { deleteComment, fetchPost } from '@/store/posts/actions';
import { isAdminOrModerator } from '@/utils/permissions';
import type { RootState } from '@/store';

interface CommentProps {
    comment: IComment;
    postId: string;
}

export const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const canDelete = isAdminOrModerator(user?.role);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirmDelete = async () => {
        const result = await dispatch(deleteComment(postId, comment.id) as any);
        if (result.success && postId) {
            dispatch(fetchPost(postId) as any);
        }
        setIsModalOpen(false);
    };

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="bg-slate-800 rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-100 font-bold">{comment.author.login}</p>
                        <p className="text-slate-300">{comment.content}</p>
                    </div>
                    {canDelete && (
                        <Button onClick={handleDeleteClick} variant="primary" size="sm">Удалить</Button>
                    )}
                </div>
                <p className="text-xs text-slate-500 mt-2">{new Date(comment.publishedAt).toLocaleString()}</p>
            </div>
            <Modal
                isOpen={isModalOpen}
                title="Удаление комментария"
                description="Вы уверены, что хотите удалить этот комментарий?"
                confirmText="Удалить"
                cancelText="Отмена"
                destructive
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};
