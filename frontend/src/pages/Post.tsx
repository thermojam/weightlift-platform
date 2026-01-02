import React from 'react';
import DOMPurify from 'dompurify';
import {Comments} from '@/widgets/Comments';
import {Loader, Modal, Toast} from '@/shared/ui';
import {usePost} from '@/entities/Post/lib/usePost.ts';
import {FaCalendarAlt, FaEdit, FaTrash} from 'react-icons/fa';
import {motion} from 'framer-motion';

export const Post: React.FC = () => {
    const {
        post,
        isLoading,
        error,
        toast,
        confirmOpen,
        canEdit,
        setConfirmOpen,
        handleEdit,
        handleDelete,
    } = usePost();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader label="Загружаем статью..."/>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-400 py-12 text-lg">{error}</div>;
    }

    if (!post) {
        return <div className="text-center text-slate-400 py-12 text-lg">Статья не найдена</div>;
    }

    return (
        <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">

                    {/* Post Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#00aaff] mb-8 text-center">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap justify-between items-center gap-x-6 gap-y-2 text-slate-400">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt />
                                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            </div>
                            {canEdit && (
                                <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                                    <button
                                        onClick={handleEdit}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                        title="Редактировать"
                                    >
                                        <FaEdit size={20}/>
                                    </button>
                                    <div className="w-px h-5 bg-white/20"></div>
                                    <button
                                        onClick={() => setConfirmOpen(true)}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                        title="Удалить"
                                    >
                                        <FaTrash size={18}/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Post Image */}
                    <div className="relative aspect-video w-full max-w-5xl mx-auto mb-8 shadow-2xl shadow-black/30 rounded-lg overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover"/>
                    </div>

                    {/* Post Content */}
                    <div
                        className="prose prose-lg lg:prose-xl prose-invert max-w-4xl mx-auto text-slate-300 prose-headings:text-slate-100 prose-strong:text-slate-100 prose-a:text-cyan-400 hover:prose-a:text-cyan-300"
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content)}}
                    />

                    {/* Comments Section */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="w-full h-px bg-slate-700 mb-8"></div>
                        <Comments comments={post.comments} postId={post.id}/>
                    </div>
                </div>
            </div>

            {/* Modal and Toast stay outside the scrollable area */}
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
            {toast && <Toast message={toast.message} type={toast.type}/>}
        </motion.div>
    );
};
