<script>
    import { push } from "svelte-spa-router";
    import Icon from "./Icon.svelte";
    import { isEnter } from "./utils";

    let searchKey = "";

    const handleSubmit = () => {
        push(`/search/${searchKey}`);
    };
</script>

<div class={$$props.class}>
    <div class="form-control mr-2">
        <div class="relative">
            <input
                type="text"
                placeholder="Search"
                class="w-full pr-16 input input-bordered"
                bind:value={searchKey}
                on:keydown={(e) => isEnter(e, handleSubmit)}
            />
            <button
                class="absolute top-0 right-0 rounded-l-none btn btn-ghost"
                on:click={handleSubmit}
            >
                <Icon name="search" class="w-6 h-6 stroke-current" />
            </button>
        </div>
    </div>
</div>
