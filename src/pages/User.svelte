<script lang="ts">
    import { getUserByUsername, User } from "../models/users";
    import { getPostsByUserName } from "../models/posts";
    import Loading from "../lib/Loading.svelte";
    import PostsList from "../lib/PostsList.svelte";
    import { currentPosts, loginInfo } from "../store";
    import { onMount } from "svelte";
    import { getModalContext } from "../lib/utils";
    import EditInfoForm from "../lib/forms/EditInfoForm.svelte";
    export let params: { username?: string } = {};
    let user: User;
    let loading = true;
    onMount(async () => {
        user = await getUserByUsername(params.username);
        currentPosts.set(await getPostsByUserName(user.username));
        loading = false;
    });

    const { open } = getModalContext("modal");
</script>

<div>
    {#if loading}
        <Loading />
    {:else}
        <div class="container py-4 relative">
            <div class="flex justify-around items-center">
                <div class="flex flex-col justify-center items-center">
                    <div
                        class="avatar h-32 w-32 rounded-full overflow-hidden border-4"
                    >
                        <img src={user.avatar} alt="avatar" />
                    </div>
                    <div class="card-title mt-2">{user.nickname}</div>
                </div>
            </div>
            {#if user._id === $loginInfo.user._id}
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
</div>
