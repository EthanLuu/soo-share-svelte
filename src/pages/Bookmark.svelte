<script lang="ts">
    import CreatePostForm from "../lib/forms/CreatePostForm.svelte";
    import PostList from "../lib/PostList.svelte";
    import { Post, getBookmarkedPosts } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import { bookmarkedList, currentPosts, loginInfo } from "../store";
    import { getModalContext, scrollToTop } from "../lib/utils";
    import Icon from "../lib/Icon.svelte";
    import { onMount } from "svelte";
    import { updateBookmarkedList } from "../models/bookmarks";

    let loading = true;
    const limit = 10;
    let skip = 0;
    let loadingNew = false;
    let stopLoading = true;

    onMount(async () => {
        await updateBookmarkedList($loginInfo.user);
    });

    const { open } = getModalContext("modal");

    const updatePosts = async () => {
        loadingNew = true;
        if (stopLoading) return;
        let newPosts: Post[];
        newPosts = await getBookmarkedPosts($bookmarkedList, skip, limit);
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

    $: {
        loading = true;
        stopLoading = false;
        currentPosts.clear();
        skip = 0;
        updatePosts();
    }

    let showBackToTop = false;
    const handleScroll = async () => {
        if (loadingNew || stopLoading) {
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
            <button
                class:opacity-0={!showBackToTop}
                class="btn btn-outline stroke-current rounded-full p-2 w-12 h-12 shadow-md transition-opacity bg-base-100 border-base-300"
                on:click={scrollToTop}
            >
                <Icon height="20" width="20" name="chevron-up" />
            </button>
            <button
                class="mt-4 btn btn-outline stroke-current rounded-full p-2 w-12 h-12 shadow-md bg-base-100 border-base-300"
                on:click={() => open(CreatePostForm)}
            >
                <Icon height="20" width="20" name="write" />
            </button>
        </div>
    </div>
</div>
