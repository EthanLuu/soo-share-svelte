import { writable } from 'svelte/store';

import type { Post } from "./models/posts";

import type { User } from "./models/users";

const createMessage = () => {
    const { subscribe, set } = writable({
        message: "",
        type: ""
    });

    return {
        subscribe,
        success: (message: string) => set({ message, type: "success" }),
        warning: (message: string) => set({ message, type: "warning" }),
        info: (message: string) => set({ message, type: "info" }),
        error: (message: string) => set({ message, type: "error" })
    };
};

export const message = createMessage();

export const tokenId = "soo-token";

const createLoginInfo = () => {
    const token = localStorage.getItem(tokenId);

    const { set, subscribe } = writable<{
        user: User;
        token: string;
        isLogin: boolean;
    }>({
        user: null,
        token: token || "",
        isLogin: false
    });

    const login = (user: User) => {
        localStorage.setItem(tokenId, user.token);
        set({
            user,
            isLogin: true,
            token: user.token
        });
    };

    const logout = () => {
        localStorage.removeItem(tokenId);
        set({
            user: null,
            isLogin: false,
            token: ""
        });
    };

    return {
        login,
        logout,
        subscribe,
        set
    };
};

export const loginInfo = createLoginInfo();

const createCurrentPosts = () => {
    const posts = writable([] as Post[]);

    const { set, subscribe } = posts;

    const add = (post: Post) => posts.update((oldPosts) => [...oldPosts, post]);
    const remove = (id: number) =>
        posts.update((oldPosts) => oldPosts.filter((post) => post.id !== id));

    return {
        add,
        remove,
        subscribe,
        set
    };
};

export const currentPosts = createCurrentPosts();
