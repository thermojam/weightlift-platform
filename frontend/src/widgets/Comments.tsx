import React from 'react';
import type { IComment } from '@/types';
import { Comment } from '@/entities/Comment';
import { CommentForm } from '@/entities/CommentForm';

interface CommentsProps {
    comments: IComment[];
    postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ comments, postId }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Комментарии</h2>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} postId={postId}/>
                ))}
            </div>
            <CommentForm postId={postId} />
        </div>
    );
};
