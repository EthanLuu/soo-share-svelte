<script lang="ts">
    import type { Post } from "src/models/posts";
    import { getUserById, User } from "../models/users";
    import { onMount } from "svelte";
    import { getTime } from "./utils";
    export let post: Post;
    let user: User;
    onMount(async () => {
        user = await getUserById(post.userId);
    });

    const time = getTime(post.date);
</script>

<div class="card sm:card-side rounded-none border bg-base-100">
    {#if post.cover}
        <img class="object-cover sm:max-w-xs" src={post.cover} alt="cover" />
    {/if}

    <div class="card-body p-4 flex justify-between">
        {#if user}
            <div class="mb-4 flex gap-2">
                <img
                    src={user.avatar}
                    alt="avatar"
                    class="h-12 w-12 rounded-full"
                />
                <div class="flex flex-col">
                    <span>{user.username}</span>
                    <span>{time}</span>
                </div>
            </div>
        {/if}
        <p>{post.content}</p>
        {#if post.link}
            <div class="card-actions">
                <a href={post.link} class="m-auto">
                    <button class="btn btn-primary btn-outline">
                        打开目标网站
                    </button>
                </a>
            </div>
        {/if}
    </div>
</div>
