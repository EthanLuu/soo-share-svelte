<script lang="ts">
    import type { ModalContext } from "./utils";
    import { getContext } from "svelte";
    import type { User } from "../models/users";
    import type { Post } from "../models/posts";
    import { deletePostById } from "../models/posts";
    import PostCard from "./PostCard.svelte";
    import Confirm from "./Confirm.svelte";
    import { message } from "../store";
    import { deleteReportById } from "../models/reports";
    interface Report {
        _id: string;
        userId?: string;
        postId: string;
        postInfo: Post;
        userInfo: User;
    }
    const { open } = getContext("modal") as ModalContext;
    export let row: Report;
    export let col;
    export let deleteCallback: (row: Report) => void;
    const showReport = () => {
        const post = {
            ...row.postInfo,
            userInfo: row.userInfo
        };
        open(PostCard, { post });
    };

    const deletePost = async () => {
        open(Confirm, {
            title: "确认删除吗？",
            fn: async () => {
                const data = await deletePostById(row.postId);
                const rData = await deleteReportById(row._id);
                if (data && rData) {
                    message.success("删除成功");
                    deleteCallback(row);
                } else {
                    message.error("删除失败");
                }
            }
        });
    };

    const deleteReport = async () => {
        const data = await deleteReportById(row._id);
        if (data) {
            message.success("忽略成功");
            deleteCallback(row);
        } else {
            message.error("忽略失败");
        }
    };
</script>

<div class="btn-group">
    <button class="btn btn-sm btn-primary btn-outline" on:click={showReport}
        >查看</button
    >
    <button class="btn btn-sm btn-outline" on:click={deletePost}>删除</button>
    <button class="btn btn-sm btn-outline btn-secondary" on:click={deleteReport}
        >忽略</button
    >
</div>
