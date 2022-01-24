import { host } from './configs';

export interface Tag {
    id: number;
    key: string;
    name: string;
}

export const getAllTags = async () => {
    const data = await fetch(`${host}/tags`);
    const tags = (await data.json()) as Tag[];
    return tags;
};
