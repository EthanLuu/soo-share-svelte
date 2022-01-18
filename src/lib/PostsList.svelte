<script lang="ts">
    import PostCard from "./PostCard.svelte";

    export let posts = [];
</script>

<div class="flex flex-col w-full max-w-xl">
    {#each posts as post (post.id)}
        <div class="-mb-px">
            <PostCard {post} />
        </div>
    {/each}
</div>
