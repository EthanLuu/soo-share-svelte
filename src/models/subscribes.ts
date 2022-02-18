import { loginInfo, subscribeList } from '../store';
import { host } from './configs';

import type { User } from "./users";

export interface Subscribe {
    _id: string;
    fromUserId: string;
    toUserId: string;
}

export const updateSubscribeList = async (user: User) => {
    const subscribes = await getSubscribesByUser(user);
    subscribeList.set(subscribes);
};

export const getSubscribesByUser = async (user: User) => {
    const response = await fetch(`${host}/subscribes/${user._id}`);
    const data = (await response.json()) as Subscribe[];
    const subscribedUsers = new Set<string>();
    data.map((item) => {
        subscribedUsers.add(item.toUserId as string);
    });
    return subscribedUsers;
};

export const addSubscribe = async (fromUserId: string, toUserId: string) => {
    const response = await fetch(`${host}/subscribes`, {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "POST",
        body: JSON.stringify({
            fromUserId,
            toUserId
        })
    });
    const data = await response.json();
    return data as Subscribe;
};

export const removeSubscribe = async (fromUserId: string, toUserId: string) => {
    const response = await fetch(`${host}/subscribes`, {
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        method: "DELETE",
        body: JSON.stringify({
            fromUserId,
            toUserId
        })
    });
    const data = await response.json();
    return data as Subscribe;
};
