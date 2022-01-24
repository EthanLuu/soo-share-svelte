<script lang="ts">
    import { currentPosts, loginInfo, message } from "../store";
    import { deletePostById, Post, reportPostById } from "../models/posts";
    import Confirm from "./Confirm.svelte";
    import Icon from "./Icon.svelte";
    import { getModalContext } from "./utils";
    import EditPostForm from "./forms/EditPostForm.svelte";
    export let post: Post;
    const modalContext = getModalContext("modal");
    const handleDelete = () => {
        modalContext.open(Confirm, {
            fn: async () => {
                const data = await deletePostById(post._id);
                if (data) {
                    currentPosts.remove(post._id);
                    message.success("删除成功");
                }
            },
            title: "确认删除吗？"
        });
    };

    const handleEdit = () => {
        modalContext.open(EditPostForm, {
            post
        });
    };

    const handleReport = () => {
        modalContext.open(Confirm, {
            fn: async () => {
                const data = await reportPostById(post._id);
                if (data) {
                    message.success("举报成功");
                }
            },
            title: "确认举报吗？"
        });
    };
</script>

<div class="dropdown dropdown-end">
    <div
        tabindex="0"
        class="cursor-pointer hover:bg-base-300 rounded-full h-6 w-6 flex items-center justify-center"
    >
        <Icon name="dots-horizontal" class="stroke-current" />
    </div>

    <div
        tabindex="0"
        class="shadow menu dropdown-content bg-base-100 w-20 border"
    >
        {#if $loginInfo.user?._id === post?.userInfo._id}
            <button
                class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-300"
                on:click={handleEdit}
            >
                <Icon class="stroke-current" name="write" />
                <span>编辑</span>
            </button>
            <button
                class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-300"
                on:click={handleDelete}
            >
                <Icon class="stroke-current" name="trash" />
                <span>删除</span>
            </button>
        {:else}
            <button
                on:click={handleReport}
                class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-300"
            >
                <Icon class="stroke-current" name="flag" />
                <span>举报</span>
            </button>
        {/if}
    </div>
</div>
