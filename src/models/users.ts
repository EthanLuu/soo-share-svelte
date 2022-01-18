import { tokenId } from '../store';

const host = "http://localhost:2333";

export interface User {
    id: number;
    username: string;
    password: string;
    nickname: string;
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

const defaultAvatar =
    "https://cdn.dribbble.com/users/49910/screenshots/4431133/attachments/1006784/avatar_04.png";

export const addOneUser = async (
    username: string,
    password: string,
    nickname: string
) => {
    const postData = {
        username,
        password,
        nickname,
        token: username,
        avatar: defaultAvatar
    };
    const response = await fetch(`${host}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data as User;
};

export const editUserInfo = async (user: User, props: any) => {
    const userInfo = { ...user, ...props };
    const response = await fetch(`${host}/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });
    const data = await response.json();
    return data as User;
};
