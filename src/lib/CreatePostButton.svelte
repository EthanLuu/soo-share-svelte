<script lang="ts">
    import CreatePostForm from "./forms/CreatePostForm.svelte";
    import Icon from "./Icon.svelte";
    import { getModalContext } from "./utils";
    const { open } = getModalContext("modal");
</script>

<button
    class="mt-4 btn btn-outline stroke-current rounded-full p-2 w-12 h-12 shadow-md bg-base-100 border-base-300"
    on:click={() => open(CreatePostForm)}
>
    <Icon height="20" width="20" name="write" />
</button>
