import type {IUser} from "@/entities/User/model/types";

export interface IComment {
    id: string;
    content: string;
    author: IUser;
    publishedAt: string;
}
