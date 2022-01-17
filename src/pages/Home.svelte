<script lang="ts">
    import PostsList from "../lib/PostsList.svelte";
    import { onMount } from "svelte";
    import { filterPostsByTag, getAllPosts, Post } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import NavBar from "../lib/NavBar.svelte";
    import { getAllTags, Tag } from "../models/tags";
    import { querystring } from "svelte-spa-router";

    let posts: Post[] = [];
    let allPosts: Post[] = [];
    let tags: Tag[] = [];
    let loading = true;

    onMount(async () => {
        allPosts = await getAllPosts();
        tags = await getAllTags();
    });

    $: params = new URLSearchParams($querystring);
    $: {
        if (params.has("tag")) {
            posts = filterPostsByTag(allPosts, params.get("tag"));
        } else {
            posts = allPosts;
        }
        loading = false;
    }
</script>

<div class="flex items-center justify-center flex-col bg-base-200 h-full">
    <NavBar {tags} />
    <div class="container py-4 flex justify-center h-full">
        {#if loading}
            <Loading />
        {:else}
            <PostsList {posts} />
        {/if}
    </div>
</div>
