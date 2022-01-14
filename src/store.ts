import { writable } from 'svelte/store';

import type { User } from "./models/users";

const createAlertMessage = () => {
    const { subscribe, set } = writable({
        message: ""
    });

    return {
        subscribe,
        set: (message: string) => set({ message })
    };
};

export const alertMessage = createAlertMessage();

export const tokenId = "soo-token";

const createLoginInfo = () => {
    const token = localStorage.getItem(tokenId);

    const { set, subscribe } = writable({
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
        })
    }

    return {
        login,
        logout,
        subscribe,
        set
    };
};

export const loginInfo = createLoginInfo();
