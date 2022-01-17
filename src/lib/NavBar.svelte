<script lang="ts">
    import { querystring } from "svelte-spa-router";

    export let tags = [];

    $: query = new URLSearchParams($querystring);
</script>

<div
    class="overflow-hidden dark:border-b-base-100 border-b relative w-full items-center justify-center dark:bg-neutral dark:text-neutral-content shadow-sm bg-base-100"
>
    <div class="flex justify-center">
        <a
            href={`#/`}
            class="btn btn-ghost btn-md text-base font-normal rounded-none"
            class:text-primary={!query.has("tag")}
        >
            {"全部"}
        </a>
        {#each tags as tag}
            <a
                href={`#/?tag=${tag.key}`}
                class="btn btn-ghost btn-md text-base font-normal rounded-none"
                class:text-primary={query.get("tag") === tag.key}
            >
                {tag.name}
            </a>
        {/each}
    </div>
</div>
