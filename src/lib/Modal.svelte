<script lang="ts">
    import Icon from "./Icon.svelte";
    import { getModalContext } from "./utils";

    const modalContext = getModalContext("modal");
    const { show, content, props, close } = modalContext;
</script>

{#if show}
    <div class="modal items-center" class:open={$show}>
        <div class="modal-box rounded-md max-w-lg relative">
            <div class="absolute z-50 right-2 top-2 cursor-pointer" on:click={close}>
                <Icon name="x" class="stroke-current stroke-2" />
            </div>
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
