<script lang="ts">
    import CreatePostForm from "../lib/forms/CreatePostForm.svelte";
    import PostsList from "../lib/PostsList.svelte";
    import { onDestroy, onMount } from "svelte";
    import { getAllPosts, getPostsByTag, Post } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import NavBar from "../lib/NavBar.svelte";
    import { getAllTags, Tag } from "../models/tags";
    import { querystring } from "svelte-spa-router";
    import { currentPosts } from "../store";
    import { getModalContext, scrollToTop } from "../lib/utils";
    import Icon from "../lib/Icon.svelte";

    let tags: Tag[] = [];
    let loading = true;
    const limit = 10;
    let skip = 0;
    let loadingNew = false;
    let stopLoading = true;

    const { open } = getModalContext("modal");

    onMount(async () => {
        tags = await getAllTags();
    });

    const updatePosts = async (params: URLSearchParams) => {
        loadingNew = true;
        if (stopLoading) return;
        let newPosts: Post[];
        if (params.has("tag")) {
            newPosts = await getPostsByTag(params.get("tag"), skip, limit);
        } else {
            newPosts = await getAllPosts(skip, limit);
        }
        loading = false;
        if (newPosts.length === 0) {
            stopLoading = true;
            return;
        }
        skip === 0
            ? currentPosts.set(newPosts)
            : currentPosts.addMany(newPosts);
        skip += limit;
        loadingNew = false;
    };

    $: params = new URLSearchParams($querystring);
    $: {
        loading = true;
        stopLoading = false;
        currentPosts.clear();
        skip = 0;
        updatePosts(params);
    }

    let showBackToTop = false;
    const handleScroll = async () => {
        if (loadingNew || stopLoading) {
            return;
        }
        showBackToTop = window.scrollY > 64;
        if (window.scrollY + screen.height >= document.body.clientHeight - 64) {
            await updatePosts(params);
        }
    };
</script>

<svelte:window on:scroll={handleScroll}/>
<div class="flex-1 relative flex flex-col">
    <NavBar {tags} />
    <div class="container py-4 flex justify-center h-full relative">
        {#if loading}
            <Loading />
        {:else}
            <PostsList posts={$currentPosts} />
        {/if}
        <div class="flex flex-col fixed bottom-8 right-8 ">
            <button
                class:opacity-0={!showBackToTop}
                class="btn btn-outline stroke-current rounded-full p-2 w-12 h-12 shadow-md transition-opacity"
                on:click={scrollToTop}
            >
                <Icon height="20" width="20" name="chevron-up" />
            </button>
            <button
                class="mt-4 btn btn-outline stroke-current rounded-full p-2 w-12 h-12 shadow-md"
                on:click={() => open(CreatePostForm)}
            >
                <Icon height="20" width="20" name="write" />
            </button>
        </div>
    </div>
</div>
