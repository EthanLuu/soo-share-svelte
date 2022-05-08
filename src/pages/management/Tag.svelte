<script lang="ts">
    import type { ModalContext } from "../../lib/utils";
    import Table from "../../lib/Table.svelte";
    import { getContext, onMount } from "svelte";
    import { deleteTag, getAllTags } from "../../models/tags";
    import ConfirmButton from "../../lib/forms/ConfirmButton.svelte";
    import AddTagForm from "../../lib/forms/AddTagForm.svelte";
    const { open } = getContext("modal") as ModalContext;
    const columns = [
        {
            key: "key",
            title: "key",
            value: (v) => v.key,
            sortable: true
        },
        {
            key: "name",
            title: "显示名称",
            value: (v) => v.name,
            sortable: true
        },
        {
            key: "_id",
            title: "操作",
            renderComponent: {
                component: ConfirmButton,
                props: {
                    text: "删除",
                    confirmText: "确认删除吗？",
                    className: "btn-sm",
                    callback: deleteTag
                }
            },
            class: "w-1/4"
        }
    ];

    let rows = [];
    onMount(async () => {
        rows = await getAllTags();
    });

    const addTag = () => {
        open(AddTagForm);
    };
</script>

<div class="flex flex-col flex-1">
    <div class="btn-group w-full justify-start">
        <button class="btn btn-primary" on:click={addTag}>添加标签</button>
    </div>
    <div class="flex-1 mt-4"><Table {rows} {columns} /></div>
</div>
