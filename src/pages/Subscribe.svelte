<script lang="ts">
    import PostList from "../lib/PostList.svelte";
    import { Post, getSubscribedPosts } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import { currentPosts, subscribeList } from "../store";
    import BackToTopButton from "../lib/BackToTopButton.svelte";
    import CreatePostButton from "../lib/CreatePostButton.svelte";

    let loading = true;
    const limit = 10;
    let skip = 0;
    let loadingPosts = false;
    let stopLoading = true;

    const updatePosts = async () => {
        loadingPosts = true;
        if (stopLoading) return;
        let newPosts: Post[];
        newPosts = await getSubscribedPosts($subscribeList, skip, limit);
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
        loading = true;
        stopLoading = false;
        currentPosts.clear();
        skip = 0;
        updatePosts();
    }

    let showBackToTop = false;
    const handleScroll = async () => {
        if (loadingPosts || stopLoading) {
            return;
        }
        showBackToTop = window.scrollY > 64;
        if (window.scrollY + screen.height >= document.body.clientHeight - 64) {
            await updatePosts();
        }
    };
</script>

<svelte:window on:scroll={handleScroll} />
<div class="flex-1 relative flex flex-col">
    <div class="container py-4 flex justify-center h-full relative">
        {#if loading}
            <Loading />
        {:else}
            <PostList posts={$currentPosts} />
        {/if}
        <div class="flex flex-col fixed bottom-8 right-8 ">
            <BackToTopButton show={showBackToTop} />
            <CreatePostButton />
        </div>
    </div>
</div>
