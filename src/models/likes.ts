import type { Post } from "./posts";
import type { User } from "./users";

const host = "http://localhost:2333";

export interface Like {
    id: number;
    userId: number;
    postId: number;
}

export const checkLiked = async (post: Post, user: User) => {
    const response = await fetch(
        `${host}/likes?userId=${user.id}&postId=${post.id}`
    );
    const data = await response.json();
    return data?.[0] as Like;
};

export const countLikes = async (post: Post) => {
    const response = await fetch(`${host}/likes?postId=${post.id}`);
    const data = await response.json();
    return data.length;
};

export const toggleLike = async (
    post: Post,
    user: User,
    like: Like,
    liked: boolean
) => {
    let response: Response;
    if (liked) {
        const body = JSON.stringify({ userId: user.id, postId: post.id });
        response = await fetch(`${host}/likes`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body
        });
    } else {
        response = await fetch(`${host}/likes/${like.id}`, {
            method: "DELETE"
        });
    }
    const data = await response.json();
    return data;
};
