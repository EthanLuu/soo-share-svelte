import { tokenId } from '../store';

const host = "http://localhost:2333";

export interface User {
    id: number;
    username: string;
    password: string;
    avatar?: string;
    token?: string;
}

export const getUserById = async (id: number) => {
    const data = await fetch(`${host}/users/${id}`);
    const user = await data.json();
    return user as User;
};

export const getUserByUsername = async (username: string) => {
    const data = await fetch(`${host}/users?username=${username}`);
    const users = (await data.json()) as User[];
    return users.length > 0 ? users[0] : null;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem(tokenId);
    const data = await fetch(`${host}/users?token=${token}`);
    const users = (await data.json()) as User[];
    return users.length > 0 ? users[0] : null;
};

export const addOneUser = async (username: string, password: string) => {
    const postData = {
        username,
        password
    };
    const data = await fetch(`${host}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
    const user = await data.json();
    return user as User;
};
