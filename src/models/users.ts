import { tokenId } from "../store";
import { host } from "./configs";

export interface User {
    _id: string;
    username: string;
    password: string;
    nickname: string;
    avatar?: string;
    token?: string;
    roleNumber: number;
}

export const getUserById = async (id: string) => {
    const data = await fetch(`${host}/users/${id}`);
    const user = await data.json();
    return user as User;
};

export const getUserByUsername = async (username: string) => {
    const data = await fetch(`${host}/users/${username}`);
    const user = await data.json();
    return user as User;
};

export const loginByPassword = async (username: string, password: string) => {
    const response = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    return data as User;
};

export const loginByToken = async () => {
    const token = localStorage.getItem(tokenId);
    if (!token) {
        return null;
    }
    try {
        const data = await fetch(`${host}/users/login`, {
            method: "POST",
            headers: {
                authorization: token
            }
        });
        if (!data.ok) return null;
        return data ? data.json() : null;
    } catch (error) {
        return null;
    }
};

const defaultAvatar = "https://cdn.ethanloo.cn/img/202202252012480.png";

export const addOneUser = async (
    username: string,
    password: string,
    nickname: string,
    email: string,
    code: string
) => {
    const postData = {
        username,
        password,
        nickname,
        email,
        code,
        avatar: defaultAvatar
    };
    const response = await fetch(`${host}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
    if (!response.ok) {
        return Promise.reject(await response.text());
    }
    const data = await response.json();
    return data as User;
};

export const editUserInfo = async (user: User, props: any) => {
    const userInfo = { ...user, ...props };
    const response = await fetch(`${host}/users/${user._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    return data;
};
