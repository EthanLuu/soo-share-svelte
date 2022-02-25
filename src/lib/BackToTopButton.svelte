<script lang="ts">
    import { scrollToTop } from "./utils";
    import Icon from "../lib/Icon.svelte";
    export let show = false;
</script>

<button
    class:opacity-0={!show}
    class="btn btn-outline stroke-current rounded-full p-2 w-12 h-12 shadow-md transition-opacity bg-base-100 border-base-300"
    on:click={scrollToTop}
>
    <Icon height="20" width="20" name="chevron-up" />
</button>
