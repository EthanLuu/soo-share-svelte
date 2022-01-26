import { loginInfo } from '../store';
import { host } from './configs';

import type { Like } from "./likes";

import type { User } from "./users";

export interface Post {
    _id: string;
    date: string;
    content: string;
    link?: string;
    cover?: string;
    userName: string;
    tag: string;
    userInfo?: User;
    likeInfo?: Like[];
}

export const getAllPosts = async () => {
    const response = await fetch(`${host}/posts`);
    const data = await response.json();
    return data as Post[];
};

export const getPostsByTag = async (tag: string) => {
    const response = await fetch(`${host}/posts?tag=${tag}`);
    const data = await response.json();
    return data as Post[];
};

export const filterPostsByTag = (posts: Post[], tag: string) => {
    return posts.filter((post) => post.tag === tag);
};

export const addOnePost = async (post: Partial<Post>, user: User) => {
    post.userName = user.username;
    const response = await fetch(`${host}/posts`, {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "POST",
        body: JSON.stringify(post)
    });
    const data = await response.json();
    return data as Post;
};

export const getPostsByUserName = async (userName: string) => {
    const response = await fetch(`${host}/posts?userName=${userName}`);
    const posts = await response.json();
    return posts as Post[];
};

export const deletePostById = async (id: string) => {
    const response = await fetch(`${host}/posts/${id}`, {
        method: "DELETE",
        headers: {
            authorization: loginInfo.getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const reportPostById = async (id: string) => {
    return id;
};

export const editPost = async (post: Post) => {
    const response = await fetch(`${host}/posts/${post._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        body: JSON.stringify({
            content: post.content,
            link: post.link,
            tag: post.tag
        })
    });
    const data = await response.json();
    return data ? post : null;
};
