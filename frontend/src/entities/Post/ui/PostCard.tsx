import React from 'react';
import { Link } from 'react-router-dom';
import type { IPost } from '@/entities/Post/model/types.ts';

interface PostCardProps {
    post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <Link
            to={`/posts/${post.id}`}
            className="group block bg-slate-800 rounded-lg shadow-lg hover:shadow-cyan-500/10 transition-shadow duration-300 overflow-hidden flex-col h-full"
        >
            <div className="relative w-full aspect-video">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-100 mb-2 flex-grow">{post.title}</h2>
                <p className="text-slate-400 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
        </Link>
    );
};
