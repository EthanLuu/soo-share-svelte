import { bookmarkedList, loginInfo } from '../store';
import { host } from './configs';

import type { User } from "./users";

export interface Bookmark {
    _id: string;
    userId: string;
    postId: string;
}

export const updateBookmarkedList = async (user: User) => {
    const bookmarks = await getBookmarksByUser(user);
    bookmarkedList.set(bookmarks);
};

export const getBookmarksByUser = async (user: User) => {
    const response = await fetch(`${host}/bookmarks/${user._id}`);
    const data = (await response.json()) as Bookmark[];
    const bookmarks = new Set<string>();
    data.map((item) => {
        bookmarks.add(item.postId as string);
    });
    return bookmarks;
};

export const addBookmark = async (user: User, postId: string) => {
    const response = await fetch(`${host}/bookmarks`, {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "POST",
        body: JSON.stringify({
            userId: user._id,
            postId
        })
    });
    const data = (await response.json()) as Bookmark;
    return data;
};

export const deleteBookmark = async (user: User, postId: string) => {
    const response = await fetch(`${host}/bookmarks`, {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "DELETE",
        body: JSON.stringify({
            userId: user._id,
            postId
        })
    });
    const data = (await response.json()) as Bookmark;
    return data;
};
