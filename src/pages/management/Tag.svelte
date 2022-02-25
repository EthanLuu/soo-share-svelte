<script>
    import Table from "../../lib/Table.svelte";
    import { onMount } from "svelte";
    import { deleteTag, getAllTags } from "../../models/tags";
    import ConfirmButton from "../../lib/forms/ConfirmButton.svelte";

    const columns = [
        {
            key: "key",
            title: "key",
            value: (v) => v.key,
            sortable: true
        },
        {
            key: "name",
            title: "name",
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
            }
        }
    ];

    let rows = [];
    onMount(async () => {
        rows = await getAllTags();
    });
</script>

<Table {rows} {columns} />
