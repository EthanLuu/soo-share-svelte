<script lang="ts">
    import CreatePostForm from "../lib/forms/CreatePostForm.svelte";
    import PostsList from "../lib/PostsList.svelte";
    import { onMount } from "svelte";
    import { getAllPosts, getPostsByTag } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import NavBar from "../lib/NavBar.svelte";
    import { getAllTags, Tag } from "../models/tags";
    import { querystring } from "svelte-spa-router";
    import { currentPosts } from "../store";
    import { getModalContext } from "../lib/utils";
    import Icon from "../lib/Icon.svelte";

    let tags: Tag[] = [];
    let loading = true;

    const { open } = getModalContext("modal");

    onMount(async () => {
        tags = await getAllTags();
    });

    $: params = new URLSearchParams($querystring);
    $: {
        loading = true;
        if (params.has("tag")) {
            getPostsByTag(params.get("tag"))
                .then(currentPosts.set)
                .then(() => (loading = false));
        } else {
            getAllPosts()
                .then(currentPosts.set)
                .then(() => (loading = false));
        }
    }
</script>

<NavBar {tags} />
<div class="container py-4 flex justify-center h-full relative">
    {#if loading}
        <Loading />
    {:else}
        <PostsList posts={$currentPosts} />
    {/if}
    <button
        class="btn absolute bottom-4 right-4 stroke-current rounded-full bg-base-100 border p-2 w-12 h-12 shadow-sm"
        on:click={() => open(CreatePostForm)}
    >
        <Icon height="20" width="20" name="write" />
    </button>
</div>
