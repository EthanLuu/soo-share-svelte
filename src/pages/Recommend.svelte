<script lang="ts">
    import PostsList from "../lib/PostsList.svelte";

    import { onMount } from "svelte";
    import { getAllPosts, Post } from "../models/posts";
    import Loading from "../lib/Loading.svelte";

    let posts: Post[] = [];
    let loading = true;

    onMount(async () => {
        posts = await getAllPosts();
        loading = false;
    });
</script>

<div class="flex items-center justify-center flex-col  bg-base-200">
    <div class="container grid max-w-5xl py-4">
        {#if loading}
            <Loading />
        {:else}
            <PostsList {posts} />
        {/if}
    </div>
</div>
