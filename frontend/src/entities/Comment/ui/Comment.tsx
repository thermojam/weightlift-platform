import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { IComment } from '@/entities/Comment/model/types';
import { Modal } from '@/shared/ui/Modal.tsx';
import { deleteComment, fetchPost } from '@/app/store/posts/actions.ts';
import { isAdminOrModerator } from '@/shared/hooks/permissions.ts';
import type { RootState } from '@/app/store';
import { FaTrash } from 'react-icons/fa';

interface CommentProps {
    comment: IComment;
    postId: string;
}

export const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<any>();
    const canDelete = isAdminOrModerator(user?.role);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirmDelete = async () => {
        const result = await dispatch(deleteComment(postId, comment.id));
        if (result.payload && postId) {
            dispatch(fetchPost(postId));
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
                        <button
                            onClick={handleDeleteClick}
                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                            title="Удалить"
                        >
                            <FaTrash size={16} />
                        </button>
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
