<script lang="ts">
    import { getModalContext } from "./utils";

    const modalContext = getModalContext("modal");
    const { show, content, props } = modalContext;
</script>

{#if show}
    <div class="modal items-center" class:open={$show}>
        <div class="modal-box rounded-md max-w-lg">
            <svelte:component this={$content} {...$props} />
        </div>
    </div>
{/if}

<style>
    .open {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
    }
</style>
