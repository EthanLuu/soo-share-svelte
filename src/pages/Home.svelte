<script lang="ts">
    import PostsList from "../lib/PostsList.svelte";
    import { onMount } from "svelte";
    import { getAllPosts, Post } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import NavBar from "../lib/NavBar.svelte";
    import { getAllTags, Tag } from "../models/tags";

    let posts: Post[] = [];
    let tags: Tag[] = [];
    let loading = true;

    onMount(async () => {
        posts = await getAllPosts();
        tags = await getAllTags();
        loading = false;
    });
</script>

<div class="flex items-center justify-center flex-col bg-base-200">
    <NavBar {tags} />
    <div class="container grid max-w-5xl py-4">
        {#if loading}
            <Loading />
        {:else}
            <PostsList {posts} />
        {/if}
    </div>
</div>
