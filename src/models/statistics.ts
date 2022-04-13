import { host } from "./configs";

export const getStatistics = async () => {
    const response = await fetch(`${host}/statistics`);
    const data = await response.json();
    return data as { userCnt: number; postCnt: number; tagCnt: number };
};

export const getPostStatistics = async () => {
    const response = await fetch(`${host}/statistics/posts`);
    const data = await response.json();
    const map = new Map();
    const { posts: items = [] } = data;
    for (let item of items) {
        map.set(item._id, item.count);
    }
    console.log(map);
    return map;
};
