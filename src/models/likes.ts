import { loginInfo } from '../store';
import { host } from './configs';

import type { Post } from "./posts";
import type { User } from "./users";

export interface Like {
    _id: string;
    userId: string;
    postId: string;
}

export const checkLiked = (post: Post, user: User) => {
    return post.likeInfo.findIndex((l) => l.userId === user._id) >= 0;
};

export const toggleLike = async (post: Post, user: User, like?: Like) => {
    let response: Response;
    if (!like) {
        const body = JSON.stringify({ userId: user._id, postId: post._id });
        response = await fetch(`${host}/likes`, {
            headers: {
                "Content-Type": "application/json",
                authorization: loginInfo.getToken()
            },
            method: "POST",
            body
        });
        const data = await response.json();
        return data;
    } else {
        response = await fetch(`${host}/likes/${like._id}`, {
            method: "DELETE",
            headers: {
                authorization: loginInfo.getToken()
            }
        });
        const data = await response.json();
        return !data;
    }
};
