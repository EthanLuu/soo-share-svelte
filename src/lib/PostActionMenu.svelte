<script lang="ts">
    import { currentPosts, loginInfo } from "../store";
    import { deletePostById, Post } from "../models/posts";
    import Confirm from "./Confirm.svelte";
    import Icon from "./Icon.svelte";
    import { getModalContext } from "./utils";
    export let post: Post;
    const modalContext = getModalContext("modal");
    const handleDelete = () => {
        modalContext.open(Confirm, {
            fn: () => {
                deletePostById(post.id);
                currentPosts.remove(post.id);
            },
            title: "确认删除吗？"
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
        {#if $loginInfo.user?.id === post?.userId}
            <button
                class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-300"
            >
                <Icon class="stroke-current" name="write" />
                <span>编辑</span>
            </button>
            <button
                class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-200"
                on:click={handleDelete}
            >
                <Icon class="stroke-current" name="trash" />
                <span>删除</span>
            </button>
        {/if}
        <button
            class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-200"
        >
            <Icon class="stroke-current" name="flag" />
            <span>举报</span>
        </button>
    </div>
</div>
