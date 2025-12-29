import type { IComment } from "@/entities/Comment/model/types";

export interface IPost {
    id: string;
    title: string;
    imageUrl: string;
    content: string;
    comments: IComment[];
    publishedAt: string;
}
