<script lang="ts">
    import PostsList from "../lib/PostsList.svelte";
    import { onMount } from "svelte";
    import { filterPostsByTag, getAllPosts, Post } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import NavBar from "../lib/NavBar.svelte";
    import { getAllTags, Tag } from "../models/tags";
    import { querystring } from "svelte-spa-router";
    import { currentPosts } from "../store";

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
            currentPosts.set(filterPostsByTag(allPosts, params.get("tag")));
        } else {
            currentPosts.set(allPosts);
        }
        loading = false;
    }
</script>

<NavBar {tags} />
<div class="container py-4 flex justify-center h-full">
    {#if loading}
        <Loading />
    {:else}
        <PostsList posts={$currentPosts} />
    {/if}
</div>
