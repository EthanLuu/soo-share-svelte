<script lang="ts">
    import type { Post } from "src/models/posts";
    import { parseTimeString } from "./utils";
    import PostReactions from "./PostReactions.svelte";
    import PostActionMenu from "./PostActionMenu.svelte";
    export let post: Post;

    const time = parseTimeString(post.date);
</script>

<div
    class="card sm:card-side rounded-none border bg-base-100 flex overflow-visible"
>
    <div class="card-body p-4 pb-2 flex justify-between w-full">
        <div class="mb-4 flex">
            <a href="/#/user/{post.userName}">
                <img
                    src={post.userInfo.avatar}
                    alt="avatar"
                    class="h-12 w-12 rounded-full mr-3"
                />
            </a>
            <div class="flex flex-col">
                <span class="font-semibold">{post.userName}</span>
                <span>{time}</span>
            </div>
        </div>
        <p>{post.content}</p>
        <div class="mt-4">
            <PostReactions {post} />
        </div>
    </div>
    <div class="absolute top-4 right-4"><PostActionMenu {post} /></div>
</div>
