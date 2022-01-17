<script lang="ts">
    import PostCard from "./PostCard.svelte";

    export let posts = [];
</script>

<div class="flex flex-col w-full max-w-xl">
    {#each posts as post}
        <div class="card-container">
            <PostCard {post} />
        </div>
    {/each}
</div>

<style>
    .card-container {
        margin-bottom: -1px;
    }
</style>
