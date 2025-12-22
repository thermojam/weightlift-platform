import React from 'react';
import { Link } from 'react-router-dom';
import type { IPost } from '@/types';

interface PostCardProps {
    post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <Link to={`/posts/${post.id}`} className="block bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-100 mb-2">{post.title}</h2>
                <p className="text-slate-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
        </Link>
    );
};
