<script lang="ts">
    import { checkLiked, countLikes, Like, toggleLike } from "../models/likes";
    import { onMount } from "svelte";
    import type { Post } from "../models/posts";
    import { loginInfo } from "../store";
    import Icon from "./Icon.svelte";
    export let post: Post;
    const { user } = $loginInfo;
    let liked: boolean = false;
    let like: Like;
    let likeCount = 0;
    onMount(async () => {
        like = await checkLiked(post, user);
        likeCount = await countLikes(post);
        liked = !!like;
    });
    const handleLike = async () => {
        liked = !liked;
        like = await toggleLike(post, user, like, liked);
        if (like) {
            liked ? (likeCount += 1) : (likeCount -= 1);
        }
    };
</script>

<div class="flex items-center justify-between flex-row-reverse">
    <div
        class="cursor-pointer flex items-center select-none"
        on:click={handleLike}
    >
        <Icon
            height="18"
            width="18"
            name="heart"
            class={`cursor-pointer mr-2 ${
                liked ? "fill-red-600" : "hover:text-red-600 stroke-current "
            }`}
        />
        <span>{likeCount}</span>
    </div>
    {#if post.link}
        <a
            href={post.link}
            class="hover:text-primary flex items-center text-sm max-w-xs"
            target="_blank"
        >
            <div>
                <Icon name="link" class="mr-1 stroke-current" height="14" />
            </div>
            <span class="overflow-hidden text-ellipsis">{post.link}</span>
        </a>
    {/if}
</div>
