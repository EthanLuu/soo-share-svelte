const host = "http://localhost:2333";

export interface Post {
    id: number,
    date: string,
    content: string,
    link: string,
    cover: string,
    userId: number
}

export const getAllPosts = async () => {
    const response = await fetch(`${host}/posts`);
    const posts = await response.json();
    return posts as Post[];
};

export const addOnePost = async (post: Partial<Post>) => {
    const response = await fetch(`${host}/posts`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(post)
    })
    const data = await response.json();
    return data;
}