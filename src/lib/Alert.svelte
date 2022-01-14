<script lang="ts">
    import { alertMessage } from "../store";
    import Icon from "./Icon.svelte";
    let hidden = true;
    let message = "";

    const autoHide = () => {
        setTimeout(() => {
            hidden = true;
        }, 3000);
    };

    alertMessage.subscribe((obj) => {
        if (!obj.message) {
            return;
        }
        hidden = false;
        message = obj.message;
        autoHide();
    });
</script>

<div
    class="alert alert-error top-0 absolute left-1/2 -translate-x-1/2"
    class:hidden
>
    <div class="flex-1">
        <Icon name="error" class="w-6 h-6 mx-2 stroke-current" />
        <span>{message}</span>
    </div>
</div>
