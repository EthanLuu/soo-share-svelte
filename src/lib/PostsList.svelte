<script lang="ts">
    import Card from "./Card.svelte";

    export let posts = [];
</script>

<div class="grid max-w-5xl">
    {#each posts as post}
        <div class="card-container">
            <Card {post} />
        </div>
    {/each}
</div>

<style>
    .card-container {
        margin-bottom: -1px;
    }
</style>
