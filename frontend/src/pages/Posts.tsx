import React, {useState} from 'react';
import {Loader} from '@/shared/ui/Loader';
import {PostCard} from '@/entities/Post/ui/PostCard.tsx';
import {usePosts} from '@/entities/Post/lib/usePosts.ts';
import {FaSearch} from 'react-icons/fa';
import {motion} from 'framer-motion';

const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5,
        },
    },
};

export const Posts: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {posts, isLoading} = usePosts(searchQuery);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <h1 className="custom-title text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent text-center sm:text-left">
                    Статьи
                </h1>
                <div className="relative w-full max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" size={18}/>
                    <input
                        type="text"
                        placeholder="Поиск по статьям..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full text-slate-100 placeholder-slate-400 bg-white/5 border border-white/20 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader label="Загружаем статьи..."/>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-slate-400 py-16">
                            {searchQuery ? 'Статьи не найдены' : 'Статей пока нет'}
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {posts.map((post) => (
                                <motion.div key={post.id}>
                                    <PostCard post={post}/>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
