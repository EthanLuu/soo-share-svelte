<script lang="ts">
    import { fade, fly } from "svelte/transition";

    import { message } from "../store";
    import Icon from "./Icon.svelte";
    let hidden = true;
    let content = "";
    let type = "";
    let lastHide: NodeJS.Timeout;

    const autoHide = () => {
        if (lastHide) {
            clearTimeout(lastHide);
        }
        lastHide = setTimeout(() => {
            hidden = true;
        }, 3000);
    };

    message.subscribe((obj) => {
        if (!obj.message) {
            return;
        }
        hidden = false;
        content = obj.message;
        type = obj.type;
        autoHide();
    });
</script>

{#if type && content && !type}
    <div
        in:fly={{ y: -5, duration: 200 }}
        out:fade
        class:alert-error={type === "error"}
        class:alert-info={type === "info"}
        class:alert-warning={type === "warning"}
        class:alert-success={type === "success"}
        class=" w-auto bg-opacity-80 text-white alert top-4 fixed left-1/2 -translate-x-1/2 z-50 shadow-lg"
    >
        <div>
            <Icon
                name={type}
                class="w-6 h-6 mx-2 stroke-current"
                v
                width={"18"}
            />
            <span>{content}</span>
        </div>
    </div>
{/if}
