<script lang="ts">
    import { getPostsByUserId, Post } from "../models/posts";
    import { getUserById } from "../models/users";
    import Loading from "../lib/Loading.svelte";
    import PostsList from "../lib/PostsList.svelte";
    export let params: { id?: number } = {};
</script>

<div>
    {#await getUserById(params.id)}
        <Loading />
    {:then user}
        <div class="container py-4 relative">
            <div class="flex justify-around items-center">
                <div class="flex flex-col justify-center items-center">
                    <div
                        class="avatar h-32 w-32 rounded-full overflow-hidden border-4"
                    >
                        <img src={user.avatar} alt="avatar" />
                    </div>
                    <div class="card-title mt-2">{user.username}</div>
                </div>
            </div>
            <button class="btn btn-outline absolute right-4 top-4"
                >编辑个人资料</button
            >
            {#await getPostsByUserId(user.id)}
                <Loading />
            {:then posts}
                <div class="flex justify-center">
                    <PostsList {posts} />
                </div>
            {/await}
        </div>
    {/await}
</div>
