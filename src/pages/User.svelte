<script lang="ts">
    import { getUserByUsername, User } from "../models/users";
    import { getPostsByUserName } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import PostsList from "../lib/PostsList.svelte";
    import { currentPosts, loginInfo } from "../store";
    import { onMount } from "svelte";
    import { getModalContext } from "../lib/utils";
    import EditInfoForm from "../lib/forms/EditInfoForm.svelte";
    import BackToTopButton from "../lib/BackToTopButton.svelte";
    export let params: { username?: string } = {};
    let user: User;
    let loading = true;
    const limit = 10;
    let skip = 0;
    let loadingPosts = false;
    let showBackToTop = false;
    let stopLoading = false;

    onMount(async () => {
        currentPosts.clear();
        user = await getUserByUsername(params.username);
        await updatePosts();
        loading = false;
    });

    const { open } = getModalContext("modal");

    const updatePosts = async () => {
        loadingPosts = true;
        let newPosts = await getPostsByUserName(user.username, skip, limit);
        if (newPosts.length === 0) {
            stopLoading = true;
            return;
        }
        skip === 0
            ? currentPosts.set(newPosts)
            : currentPosts.addMany(newPosts);
        loading = false;
        skip += limit;
        loadingPosts = false;
    };

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
<div>
    {#if loading}
        <Loading />
    {:else}
        <div class="container py-4 relative">
            <div class="flex justify-around items-center mt-4">
                <div class="flex flex-col justify-center items-center">
                    <div
                        class="avatar h-32 w-32 rounded-full overflow-hidden border-4"
                    >
                        <img
                            src={user.avatar}
                            alt="avatar"
                            class="object-cover bg-white"
                        />
                    </div>
                    <div class="card-title mt-2">{user.nickname}</div>
                </div>
            </div>
            {#if user._id === $loginInfo.user?._id}
                <button
                    class="btn btn-outline absolute right-4 top-4"
                    on:click={() => open(EditInfoForm, { user })}
                    >编辑个人资料</button
                >
            {/if}
            <div class="flex justify-center">
                <PostsList posts={$currentPosts} />
            </div>
        </div>
    {/if}
    <div class="flex flex-col fixed bottom-8 right-8 ">
        <BackToTopButton show={showBackToTop} />
    </div>
</div>
