<script lang="ts">
    import type { Post } from "src/models/posts";
    import { getUserById, User } from "../models/users";
    import { onMount } from "svelte";
    import { parseTimeString } from "./utils";
    import PostReactions from "./PostReactions.svelte";
    export let post: Post;
    let user: User;
    onMount(async () => {
        user = await getUserById(post.userId);
    });

    const time = parseTimeString(post.date);
</script>

<div class="card sm:card-side rounded-none border bg-base-100 flex">
    <div class="card-body p-4 pb-2 flex justify-between w-full">
        <div class="mb-4 flex gap-2">
            <img
                src={user?.avatar}
                alt="avatar"
                class="h-12 w-12 rounded-full"
            />
            <div class="flex flex-col">
                <span>{user?.username}</span>
                <span>{time}</span>
            </div>
        </div>
        <p>{post.content}</p>
        <div class="mt-4">
            <PostReactions {post} />
        </div>
    </div>
</div>
