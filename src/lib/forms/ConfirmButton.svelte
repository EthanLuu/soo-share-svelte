<script lang="ts">
    import Confirm from "../Confirm.svelte";
    import { getModalContext } from "../utils";
    const modalContext = getModalContext("modal");
    export let text: string;
    export let confirmText: string = "";
    export let callback: any;
    export let className: string = "";
    export let row: any;
    export let col: any;
    const handleClick = () => {
        modalContext.open(Confirm, {
            fn: () => callback(row),
            title: confirmText
        });
    };

</script>

<button class="btn {className}" on:click={handleClick}>
    {text}
</button>
