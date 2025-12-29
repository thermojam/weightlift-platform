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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-0 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-slate-100">Статьи</h1>
            </div>

            <div className="mb-8">
                <div className="relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18}/>
                    <input
                        type="text"
                        placeholder="Поиск по статьям..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 text-slate-100 rounded-lg pl-12 pr-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00aaff] focus:border-transparent placeholder-slate-500"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader label="Загружаем статьи..."/>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">
                        {searchQuery ? 'Статьи не найдены' : 'Статей пока нет'}
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4"
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
    );
};
