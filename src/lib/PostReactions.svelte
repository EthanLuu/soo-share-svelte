<script lang="ts">
    import { Like, toggleLike } from "../models/likes";
    import { onMount } from "svelte";
    import type { Post } from "../models/posts";
    import { loginInfo } from "../store";
    import Icon from "./Icon.svelte";
    export let post: Post;
    const { user } = $loginInfo;
    let like: Like;
    let likeCount = 0;
    onMount(async () => {
        likeCount = post.likeInfo.length;
        if (!user) {
            return;
        }
        like = post.likeInfo.find((l) => l.userId === user._id);
    });
    const handleLike = async () => {
        if (!user) {
            return;
        }
        like = await toggleLike(post, user, like);
        like ? (likeCount += 1) : (likeCount -= 1);
    };
</script>

<div class="flex items-center justify-between flex-row-reverse flex-1">
    <div
        class="cursor-pointer flex items-center select-none"
        on:click={handleLike}
    >
        <Icon
            height="18"
            width="18"
            name="heart"
            class={`cursor-pointer mr-2 ${
                !!like ? "fill-red-600" : "hover:text-red-600 stroke-current "
            }`}
        />
        <span class="w-8 text-ellipsis overflow-hidden">{likeCount}</span>
    </div>
    {#if post.link}
        <div>
            <a
                href={post.link}
                class="hover:text-primary flex items-center text-sm max-w-sm"
                target="_blank"
            >
                <div>
                    <Icon name="link" class="mr-1 stroke-current" height="14" />
                </div>
                <span class="overflow-hidden text-ellipsis whitespace-nowrap"
                    >{decodeURI(post.link)}</span
                >
            </a>
        </div>
    {/if}
</div>
