<script lang="ts">
    import PostList from "../lib/PostList.svelte";
    import { onMount } from "svelte";
    import { getAllPosts, getPostsByTag, Post } from "../models/posts";
    import NavBar from "../lib/NavBar.svelte";
    import { getAllTags, Tag } from "../models/tags";
    import { querystring } from "svelte-spa-router";
    import { currentPosts } from "../store";
    import BackToTopButton from "../lib/BackToTopButton.svelte";
    import CreatePostButton from "../lib/CreatePostButton.svelte";

    let tags: Tag[] = [];
    let loadingNavs = true;
    let navs = [{ key: "", name: "全部", href: "/" }];

    const limit = 10;
    let skip = 0;
    let loadingPosts = true;
    let stopLoading = true;
    let showBackToTop = false;

    onMount(async () => {
        tags = await getAllTags();
        tags.map((tag) => {
            navs.push({
                key: tag.key,
                name: tag.name,
                href: `/?tag=${tag.key}`
            });
        });
        loadingNavs = false;
    });

    const updatePosts = async (params: URLSearchParams) => {
        loadingPosts = true;
        if (stopLoading) return;
        let newPosts: Post[];
        if (params.has("tag")) {
            newPosts = await getPostsByTag(params.get("tag"), skip, limit);
        } else {
            newPosts = await getAllPosts(skip, limit);
        }
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

    $: params = new URLSearchParams($querystring);
    $: {
        stopLoading = false;
        currentPosts.clear();
        skip = 0;
        updatePosts(params);
    }

    let timer: NodeJS.Timeout;
    const handleScroll = async () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            if (loadingPosts || stopLoading) {
                return;
            }
            showBackToTop = window.scrollY > 64;
            if (
                window.scrollY + screen.height >=
                document.body.clientHeight - window.innerHeight
            ) {
                await updatePosts(params);
            }
        }, 100);
    };
</script>

<svelte:window on:scroll={handleScroll} />
<div class="flex-1 relative flex flex-col">
    {#if !loadingNavs}
        <NavBar {navs} />
    {/if}
    <div class="container py-4 flex justify-center h-full relative">
        <PostList posts={$currentPosts} />
        <div class="flex flex-col fixed bottom-8 right-8 ">
            <BackToTopButton show={showBackToTop} />
            <CreatePostButton />
        </div>
    </div>
</div>
