<script lang="ts">
    import PostsList from "../lib/PostsList.svelte";
    import { getPostsBySearchKey, Post } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import { currentPosts } from "../store";
    import BackToTopButton from "../lib/BackToTopButton.svelte";
    import CreatePostButton from "../lib/CreatePostButton.svelte";
    export let params: { searchKey?: string } = {};

    let loading = true;
    const limit = 10;
    let skip = 0;
    let loadingPosts = false;
    let stopLoading = true;
    let searchKey = params.searchKey;

    const updatePosts = async (searchKey: string) => {
        loadingPosts = true;
        if (stopLoading) return;
        let newPosts: Post[];
        newPosts = await getPostsBySearchKey(searchKey, skip, limit);

        loading = false;
        if (newPosts.length === 0) {
            stopLoading = true;
            return;
        }
        skip === 0
            ? currentPosts.set(newPosts)
            : currentPosts.addMany(newPosts);
        skip += limit;
        loadingPosts = false;
    };

    $: {
        searchKey = params.searchKey;
        loading = true;
        stopLoading = false;
        currentPosts.clear();
        skip = 0;
        updatePosts(searchKey);
    }

    let showBackToTop = false;
    const handleScroll = async () => {
        if (loadingPosts || stopLoading) {
            return;
        }
        showBackToTop = window.scrollY > 64;
        if (window.scrollY + screen.height >= document.body.clientHeight - 64) {
            await updatePosts(searchKey);
        }
    };
</script>

<svelte:window on:scroll={handleScroll} />
<div class="flex-1 relative flex flex-col">
    <div class="container py-4 flex h-full relative flex-col">
        <h1 class="text-lg flex justify-center">搜索关键词：{searchKey}</h1>
        <div class="mt-4 w-full flex justify-center">
            {#if loading}
                <Loading />
            {:else}
                <PostsList posts={$currentPosts} />
            {/if}
        </div>

        <div class="flex flex-col fixed bottom-8 right-8 ">
            <BackToTopButton show={showBackToTop} />
            <CreatePostButton />
        </div>
    </div>
</div>
