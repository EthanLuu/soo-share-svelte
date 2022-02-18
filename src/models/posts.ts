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

export const getAllPosts = async (skip?: number, limit?: number) => {
    const fetchUrl = new URL(`${host}/posts`);
    fetchUrl.searchParams.append("skip", String(skip || 0));
    limit && fetchUrl.searchParams.append("limit", String(limit));
    const response = await fetch(fetchUrl.toString());
    const data = await response.json();
    return data as Post[];
};

export const getPostsBySearchKey = async (
    searchKey: string,
    skip?: number,
    limit?: number
) => {
    const fetchUrl = new URL(`${host}/posts/search/${searchKey}`);
    fetchUrl.searchParams.append("skip", String(skip || 0));
    limit && fetchUrl.searchParams.append("limit", String(limit));
    const response = await fetch(fetchUrl.toString());
    const data = await response.json();
    return data as Post[];
};

export const getPostsByTag = async (
    tag: string,
    skip?: number,
    limit?: number
) => {
    const fetchUrl = new URL(`${host}/posts`);
    fetchUrl.searchParams.append("skip", String(skip || 0));
    limit && fetchUrl.searchParams.append("limit", String(limit));
    fetchUrl.searchParams.append("tag", tag);
    const response = await fetch(fetchUrl.toString());
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

export const getPostsByUserName = async (
    userName: string,
    skip?: number,
    limit?: number
) => {
    const fetchUrl = new URL(`${host}/posts`);
    fetchUrl.searchParams.append("skip", String(skip || 0));
    limit && fetchUrl.searchParams.append("limit", String(limit));
    fetchUrl.searchParams.append("userName", userName);
    const response = await fetch(fetchUrl.toString());
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

export const getSubscribedPosts = async (
    subscribeList: Set<string>,
    skip: number,
    limit: number
) => {
    const fetchUrl = new URL(`${host}/posts`);
    fetchUrl.searchParams.append("skip", String(skip || 0));
    limit && fetchUrl.searchParams.append("limit", String(limit));
    const response = await fetch(fetchUrl.toString(), {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "POST",
        body: JSON.stringify({
            subscribeList: [...subscribeList]
        })
    });
    const posts = await response.json();
    return posts as Post[] || [];
};

export const getBookmarkedPosts = async (
    bookmarkedList: Set<string>,
    skip: number,
    limit: number
) => {
    const fetchUrl = new URL(`${host}/posts`);
    fetchUrl.searchParams.append("skip", String(skip || 0));
    limit && fetchUrl.searchParams.append("limit", String(limit));
    const response = await fetch(fetchUrl.toString(), {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "POST",
        body: JSON.stringify({
            bookmarkedList: [...bookmarkedList]
        })
    });
    const posts = await response.json();
    return posts as Post[] || [];
};
