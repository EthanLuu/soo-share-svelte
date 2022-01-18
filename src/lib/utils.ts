import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { Writable } from "svelte/store";

const format = new Intl.DateTimeFormat("zh-cn", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
});

export const parseTimeString = (date: string) => {
    // format time
    const now = new Date();
    const old = new Date(date);
    const interval = now.getTime() - old.getTime();
    const hours = interval / (1000 * 3600);
    const minutes = (interval % (1000 * 3600)) / (60 * 1000);
    if (hours > 23) {
        return format.format(old);
    } else if (hours >= 1) {
        return `${Math.ceil(hours)}小时前`;
    } else if (minutes >= 1) {
        return `${Math.ceil(minutes)}分钟前`;
    } else {
        return "刚刚";
    }
};

export interface ModalContext {
    show: Writable<boolean>;
    content: Writable<any>;
    props: Writable<any>;
    close: () => void;
    open: (component: any, props?: any) => void;
}

export const createModalContext = (
    key: string,
    value: boolean
): ModalContext => {
    const show = writable<boolean>(value);
    const content = writable<any>();
    const props = writable<any>();
    const context = {
        show,
        content,
        props,
        close: () => show.set(false),
        open: (c: any, p?: any) => {
            content.set(c);
            props?.set(p);
            show.set(true);
        }
    };
    setContext(key, context);
    return context;
};

export const getModalContext = (key: string) => {
    return getContext(key) as ModalContext;
};
