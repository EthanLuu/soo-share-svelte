<script lang="ts">
    import { location, querystring, link } from "svelte-spa-router";
    export let navs = [];
    let activeKey = "";
    $: {
        const query = new URLSearchParams($querystring);
        navs.forEach((nav) => {
            if (query?.get("tag") === nav.key || $location === nav.href) {
                activeKey = nav.key;
                return;
            }
        });
    }
</script>

<div
    class="h-12 flex overflow-hidden dark:border-b-base-100 border-b items-center justify-center dark:bg-neutral dark:text-neutral-content shadow-sm bg-base-100"
>
    <div class="h-12 flex justify-center">
        {#each navs as nav}
            <a
                use:link
                href={nav.href}
                class="h-12 btn btn-ghost btn-md text-base font-normal rounded-none"
                class:text-primary={activeKey === nav.key}
            >
                {nav.name}
            </a>
        {/each}
    </div>
</div>
