import { loginInfo } from '../store';
import { host } from './configs';

export interface Tag {
    _id?: string;
    key: string;
    name: string;
}

export const getAllTags = async () => {
    const data = await fetch(`${host}/tags`);
    const tags = (await data.json()) as Tag[];
    return tags;
};

export const addTag = async (body: Partial<Tag>) => {
    const response = await fetch(`${host}/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: loginInfo.getToken()
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
};

export const deleteTag = async (tag: Tag) => {
    const response = await fetch(`${host}/tags/${tag.key}`, {
        method: "DELETE",
        headers: {
            authorization: loginInfo.getToken()
        }
    });
    const data = await response.json();
    return data;
};
