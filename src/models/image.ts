import * as qiniu from 'qiniu-js';
import { getTodayString } from '../lib/utils';
import { loginInfo } from '../store';
import { host } from './configs';

export const getQiNiuToken = async () => {
    const response = await fetch(`${host}/image/token`, {
        headers: {
            authorization: loginInfo.getToken()
        }
    });
    const data = await response.json();
    return data.token as string;
};

export const uploadImage = async (file: File, callback: any) => {
    const token = await getQiNiuToken();
    const [name, type] = file.name.split(".");
    const key = `img/share/${getTodayString()}/${Math.random()
        .toString(12)
        .substring(6)}.${type}`;
    const observable = qiniu.upload(file, key, token);
    const subscription = observable.subscribe(null, null, callback);
    return `https://cdn.ethanloo.cn/${key}`;
};
