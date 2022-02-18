<script lang="ts">
    import { Like, toggleLike } from "../models/likes";
    import { onMount } from "svelte";
    import type { Post } from "../models/posts";
    import { loginInfo, message, bookmarkedList } from "../store";
    import Icon from "./Icon.svelte";
    import { addBookmark, deleteBookmark } from "../models/bookmarks";
    export let post: Post;
    const { user } = $loginInfo;
    let like: Like;
    let likeCount = 0;
    $: bookmarked = $bookmarkedList.has(post._id);
    onMount(async () => {
        likeCount = post.likeInfo.length;
        if (!user) {
            return;
        }
        like = post.likeInfo.find((l) => l.userId === user._id);
    });
    const handleLike = async () => {
        if (!user) {
            message.error("请登录之后尝试");
            return;
        }
        like = await toggleLike(post, user, like);
        like ? (likeCount += 1) : (likeCount -= 1);
    };
    const handleBookmark = async () => {
        if (!user) {
            message.error("请登录之后尝试");
            return;
        }
        if (bookmarked) {
            await deleteBookmark($loginInfo.user, post._id);
        } else {
            await addBookmark($loginInfo.user, post._id);
        }
        bookmarked = !bookmarked;
    };
</script>


<div class="flex items-center justify-between flex-row-reverse flex-1">
    <div class="flex">
        <div
            title="收藏"
            class="cursor-pointer flex items-center select-none"
            on:click={handleBookmark}
        >
            <Icon
                height="18"
                width="18"
                name="star"
                class={`cursor-pointer mr-2 ${
                    !!bookmarked
                        ? "fill-yellow-300"
                        : "hover:text-yellow-300 stroke-current "
                }`}
            />
        </div>
        <div
            title="喜欢"
            class="cursor-pointer flex items-center select-none"
            on:click={handleLike}
        >
            <Icon
                height="18"
                width="18"
                name="heart"
                class={`cursor-pointer mr-2 ${
                    !!like
                        ? "fill-red-600"
                        : "hover:text-red-600 stroke-current "
                }`}
            />
            <span class="w-8 text-ellipsis overflow-hidden">{likeCount}</span>
        </div>
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
