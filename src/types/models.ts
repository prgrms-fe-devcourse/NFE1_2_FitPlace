// src/types/models.ts

export interface PostType {
    likes: Like[];
    comments: Comment[];
    _id: string;
    image?: string;
    imagePublicId?: string;
    title: string;
    channel: Channel;
    author: User;
    createdAt: string;
    updatedAt: string;
}

export interface Like {
    // Like 인터페이스 정의 (필요한 경우 추가)
}

export interface User {
    coverImage: string;
    image: string;
    role: string;
    emailVerified: boolean;
    banned: boolean;
    isOnline: boolean;
    posts: PostType[];
    likes: Like[];
    comments: string[];
    followers: any[]; // 타입을 더 구체적으로 정의할 수 있습니다
    following: Following[];
    notifications: Notification[];
    messages: Message[];
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface Following {
    _id: string;
    user: string;
    follower: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Channel {
    authRequired?: boolean;
    posts?: string[];
    _id: string;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Comment {
    _id: string;
    comment: string;
    author: User;
    post: string;
    createdAt: string;
    updatedAt: string;
}

export interface Notification {
    seen: boolean;
    _id: string;
    author: User;
    user: User | string;
    post: string | null;
    follow?: string;
    comment?: Comment;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    // Message 인터페이스 정의 (필요한 경우 추가)
}
