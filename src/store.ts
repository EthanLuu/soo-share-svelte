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

    const login = async (user: User) => {
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

    const getToken = () => localStorage.getItem(tokenId);

    return {
        login,
        logout,
        subscribe,
        set,
        getToken
    };
};

export const loginInfo = createLoginInfo();

const createCurrentPosts = () => {
    const posts = writable([] as Post[]);

    const { set, subscribe } = posts;

    const add = (post: Post) => posts.update((oldPosts) => [post, ...oldPosts]);
    const addMany = (newPosts: Post[]) =>
        posts.update((oldPosts) => [...oldPosts, ...newPosts]);
    const remove = (id: string) =>
        posts.update((oldPosts) => oldPosts.filter((post) => post._id !== id));
    const edit = (post: Post) =>
        posts.update((oldPosts) => {
            oldPosts[oldPosts.findIndex((p) => p._id === post._id)] = post;
            return oldPosts;
        });
    const clear = () => posts.set([]);

    return {
        add,
        addMany,
        remove,
        clear,
        edit,
        subscribe,
        set
    };
};

export const currentPosts = createCurrentPosts();

const createSubscribeList = () => {
    const list = writable(new Set<string>());
    const { set, subscribe } = list;
    const add = (userId: string) =>
        list.update((oldList) => oldList.add(userId));
    const remove = (userId: string) => {
        list.update((oldList) => {
            oldList.delete(userId);
            return oldList;
        });
    };

    return {
        add,
        remove,
        set,
        subscribe
    };
};
export const subscribeList = createSubscribeList();

const createBookMarkList = () => {
    const list = writable(new Set<string>());
    const { set, subscribe } = list;
    const add = (postId: string) =>
        list.update((oldList) => oldList.add(postId));
    const remove = (postId: string) => {
        list.update((oldList) => {
            oldList.delete(postId);
            return oldList;
        });
    };

    return {
        add,
        remove,
        set,
        subscribe
    };
};
export const bookmarkedList = createBookMarkList();
