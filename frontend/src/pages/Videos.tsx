import React from 'react';
import {Loader} from '@/shared/ui/Loader';
import {useVideos} from '@/shared/hooks/useVideos';
import {FaSearch} from 'react-icons/fa';
import {AnimatePresence, motion} from 'framer-motion';

const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const item = {
    hidden: {y: 20, opacity: 0},
    show: {y: 0, opacity: 1},
    exit: {y: -20, opacity: 0},
};

export const Videos: React.FC = () => {
    const {
        isLoading,
        error,
        search,
        selectedVideo,
        filteredVideos,
        setSearch,
        setSelectedVideo,
    } = useVideos();

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                    <h1 className="custom-title text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent text-center sm:text-left">
                        Видео
                    </h1>
                    <div className="relative w-full max-w-md">
                        <FaSearch
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10"
                            size={18}/>
                        <input
                            type="text"
                            placeholder="Поиск по видео..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full text-slate-100 placeholder-slate-400 bg-white/5 border border-white/20 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader label="Загружаем видео..."/>
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-400 py-16">{error}</div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                <AnimatePresence>
                                    {filteredVideos.map((video) => (
                                        <motion.div variants={item} key={video.id} exit="exit" layout>
                                            <button
                                                onClick={() => setSelectedVideo(video)}
                                                className="group w-full text-left bg-white/5 rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-400/10 transition-all duration-300 h-full flex flex-col"
                                            >
                                                <div className="relative overflow-hidden aspect-video">
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <h2 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                                                        {video.title}
                                                    </h2>
                                                    <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-1">{video.channelTitle}</p>
                                                    <div className="mt-auto text-xs text-slate-500">
                                                        {new Date(video.publishedAt).toLocaleDateString('ru-RU')}
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {filteredVideos.length === 0 && (
                                    <div className="col-span-full text-center text-slate-400 py-16">
                                        {search ? 'Видео не найдено' : 'Видео пока нет'}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedVideo(null)}>
                    <div
                        className="bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                            <h3 className="text-slate-100 font-semibold line-clamp-1 text-sm sm:text-base">
                                {selectedVideo.title}
                            </h3>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="text-slate-400 hover:text-slate-100 transition-colors text-2xl"
                                aria-label="Закрыть"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="bg-black aspect-video">
                            <iframe
                                title={selectedVideo.title}
                                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="max-h-32 overflow-y-auto p-4 text-slate-300 text-sm hide-scrollbar">
                            <p className="whitespace-pre-wrap">{selectedVideo.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
