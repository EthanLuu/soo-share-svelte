
export interface Tag {
    id: number,
    key: string,
    name: string
}

const host = "http://localhost:2333";

export const getAllTags = async () => {
    const data = await fetch(`${host}/tags`);
    const tags = await data.json() as Tag[];
    return tags;
}