import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

type YouTubeVideo = {
    id: string;
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    channelTitle: string;
};

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export const useVideos = () => {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const channelRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
                );
                const channelData = await channelRes.json();
                const uploadsId =
                    channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
                if (!uploadsId) {
                    throw new Error('Не удалось получить плейлист канала');
                }

                const videosRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=30&key=${API_KEY}`
                );
                const videosData = await videosRes.json();
                const items = videosData?.items ?? [];

                const mapped: YouTubeVideo[] = items
                    .map((item: any) => ({
                        id: item?.snippet?.resourceId?.videoId,
                        videoId: item?.snippet?.resourceId?.videoId,
                        title: item?.snippet?.title,
                        description: item?.snippet?.description,
                        thumbnail:
                            item?.snippet?.thumbnails?.high?.url ||
                            item?.snippet?.thumbnails?.default?.url,
                        publishedAt: item?.snippet?.publishedAt,
                        channelTitle: item?.snippet?.channelTitle,
                    }))
                    .filter((v: YouTubeVideo) => Boolean(v.id));

                setVideos(mapped);
            } catch (e: any) {
                setError(e?.message || 'Ошибка загрузки видео');
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, []);

    const filteredVideos = useMemo(() => {
        if (!debouncedSearch) return videos;
        return videos.filter((v) =>
            v.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [videos, debouncedSearch]);

    return {
        videos,
        isLoading,
        error,
        search,
        selectedVideo,
        filteredVideos,
        setSearch,
        setSelectedVideo,
    };
};
