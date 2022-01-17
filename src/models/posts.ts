import type { User } from "./users";

const host = "http://localhost:2333";

export interface Post {
    id: number;
    date: string;
    content: string;
    link?: string;
    cover?: string;
    userId: number;
    userName: string;
    userAvatar: string;
    tag: string;
}

export const getAllPosts = async () => {
    const response = await fetch(`${host}/posts?_sort=date&_order=desc`);
    const posts = await response.json();
    return posts as Post[];
};

export const filterPostsByTag = (posts: Post[], tag: string) => {
    return posts.filter((post) => post.tag === tag);
};

export const addOnePost = async (post: Partial<Post>, user: User) => {
    post.date = new Date().toUTCString();
    post.userId = user.id;
    post.userAvatar = user.avatar;
    post.userName = user.username;
    const response = await fetch(`${host}/posts`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(post)
    });
    const data = await response.json();
    return data;
};

export const getPostsByUserId = async (userId: number) => {
    const response = await fetch(
        `${host}/posts?userId=${userId}&_sort=date&_order=desc`
    );
    const posts = await response.json();
    return posts as Post[];
};
