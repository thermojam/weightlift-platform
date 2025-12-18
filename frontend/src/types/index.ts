export interface IUser {
    id: string;
    login: string;
    role: string;
}

export interface IPost {
    id: string;
    title: string;
    imageUrl: string;
    content: string;
    comments: IComment[];
    publishedAt: string;
}

export interface IComment {
    id: string;
    content: string;
    author: IUser;
    publishedAt: string;
}
