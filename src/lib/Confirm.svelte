<script lang="ts">
    import { getModalContext } from "./utils";
    export let fn: () => void;
    export let title: string;
    const { close } = getModalContext("modal");
    const handleConfirm = () => {
        fn();
        close();
    };
</script>

<p>
    {title}
</p>
<div class="modal-action">
    <button class="btn btn-primary" on:click={handleConfirm}>确认</button>
    <button class="btn" on:click={close}>取消</button>
</div>
