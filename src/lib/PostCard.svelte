<script lang="ts">
    import { addSubscribe, removeSubscribe } from "./../models/subscribes";
    import { loginInfo, subscribeList } from "../store";
    import type { Post } from "src/models/posts";
    import { parseTimeString } from "./utils";
    import PostReactions from "./PostReactions.svelte";
    import PostActionMenu from "./PostActionMenu.svelte";
    export let post: Post;
    $: subscribed = $subscribeList.has(post.userInfo._id);
    const time = parseTimeString(post.date);
    let hovered = false;

    const handleClick = async () => {
        if (subscribed) {
            subscribeList.remove(post.userInfo._id);
            await removeSubscribe($loginInfo.user._id, post.userInfo._id);
        } else {
            await addSubscribe($loginInfo.user._id, post.userInfo._id);
            subscribeList.add(post.userInfo._id);
        }
    };
</script>

<div
    class="card sm:card-side rounded-none border bg-base-100 flex overflow-visible"
>
    <div class="card-body p-4 pb-2 flex justify-between w-full">
        <div class="mb-4 flex items-center">
            <a href="/#/user/{post.userName}">
                <img
                    src={post.userInfo.avatar}
                    alt="avatar"
                    class="h-12 w-12 rounded-full mr-3 object-cover bg-white"
                />
            </a>
            <div class="flex flex-col">
                <a href="/#/user/{post.userName}" class="font-semibold">
                    {post.userInfo.nickname}</a
                >
                <span>{time}</span>
            </div>
            {#if $loginInfo.isLogin}
                <button
                    class="btn btn-outline ml-4 btn-sm"
                    class:btn-primary={subscribed}
                    on:click={handleClick}
                    on:mouseenter={() => (hovered = true)}
                    on:mouseleave={() => (hovered = false)}
                >
                    {subscribed ? (hovered ? "取消关注" : "已关注") : "+关注"}
                </button>
            {/if}
        </div>
        <p>{post.content}</p>
        <div class="mt-4 flex">
            <PostReactions {post} />
        </div>
    </div>
    <div class="absolute top-4 right-4"><PostActionMenu {post} /></div>
</div>
