import { host } from './configs';

export const getStatistics = async () => {
    const response = await fetch(`${host}/statistics`);
    const data = await response.json();
    return data as { userCnt: number; postCnt: number; tagCnt: number };
};
