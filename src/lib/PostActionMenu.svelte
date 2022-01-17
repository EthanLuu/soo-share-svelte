<script lang="ts">
    import Icon from "./Icon.svelte";
</script>

<div class="dropdown dropdown-end">
    <div
        tabindex="0"
        class="cursor-pointer hover:bg-base-200 rounded-full h-6 w-6 flex items-center justify-center"
    >
        <Icon name="dots-horizontal" class="stroke-current" />
    </div>

    <div tabindex="0" class="shadow menu dropdown-content bg-base-100 w-20">
        <button class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-200">
            <Icon class="stroke-current" name="trash"/>
           <span>删除</span>
        </button>
        <button class="px-2 py-2 flex w-full items-center justify-around hover:bg-base-200">
            <Icon class="stroke-current" name="flag"/>
           <span>举报</span>
        </button>
    </div>
</div>
