<script>
    import Icon from "./Icon.svelte";
</script>

<div class={$$props.class}>
    <div class="form-control mr-2">
        <div class="relative">
            <input
                type="text"
                placeholder="Search"
                class="w-full pr-16 input input-bordered"
            />
            <button
                class="absolute top-0 right-0 rounded-l-none btn btn-ghost"
            >
                <Icon name="search" class="w-6 h-6 stroke-current" />
            </button>
        </div>
    </div>
</div>
