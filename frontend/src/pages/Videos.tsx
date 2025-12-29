import React from 'react';
import { Loader } from '@/shared/ui/Loader';
import { useVideos } from '@/shared/hooks/useVideos';

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-0 flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-100 mb-4">Видео</h1>

                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Поиск видео..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-800 text-slate-100 rounded-lg pl-4 pr-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00aaff] focus:border-transparent placeholder-slate-500"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader label="Загружаем видео..." />
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-center py-10">{error}</div>
                ) : filteredVideos.length === 0 ? (
                    <div className="text-center text-slate-400 py-10">
                        {search ? 'Видео не найдены по запросу' : 'Видео не найдены'}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
                        {filteredVideos.map((video) => (
                            <button
                                key={video.id}
                                onClick={() => setSelectedVideo(video)}
                                className="bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-left overflow-hidden border border-slate-700"
                            >
                                <div className="relative">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2 hover:text-[#00aaff] transition-colors">
                                        {video.title}
                                    </h2>
                                    <p className="text-slate-400 text-sm mb-2">{video.channelTitle}</p>
                                    <p className="text-slate-500 text-xs">
                                        {new Date(video.publishedAt).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selectedVideo && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                            <div className="text-slate-100 font-semibold line-clamp-2">
                                {selectedVideo.title}
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="text-slate-400 hover:text-slate-200 transition-colors text-xl"
                                aria-label="Закрыть"
                            >
                                ×
                            </button>
                        </div>
                        <div className="bg-black aspect-video">
                            <iframe
                                title={selectedVideo.title}
                                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="px-4 py-3 text-slate-300 text-sm">
                            {selectedVideo.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
