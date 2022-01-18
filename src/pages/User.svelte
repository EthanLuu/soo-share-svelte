<script lang="ts">
    import type { User } from "../models/users";
    import { getPostsByUserId } from "../models/posts";
    import { getUserById } from "../models/users";
    import Loading from "../lib/Loading.svelte";
    import PostsList from "../lib/PostsList.svelte";
    import { currentPosts } from "../store";
    import { onMount } from "svelte";
    export let params: { id?: number } = {};
    let user: User;
    let loading = true;
    onMount(async () => {
        user = await getUserById(params.id);
        currentPosts.set(await getPostsByUserId(user.id));
        loading = false;
    });
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
            <button class="btn btn-outline absolute right-4 top-4"
                >编辑个人资料</button
            >
            <div class="flex justify-center">
                <PostsList posts={$currentPosts} />
            </div>
        </div>
    {/if}
</div>
