<script lang="ts">
    import Table from "../../lib/Table.svelte";
    import { onMount } from "svelte";
    import { getAllReports } from "../../models/reports";
    import ReportButtonGroup from "../../lib/ReportButtonGroup.svelte";
    const columns = [
        {
            key: "key",
            title: "用户昵称",
            value: (v) => v.postInfo.userName,
            sortable: true
        },
        {
            key: "name",
            title: "碎片信息",
            value: (v) => v.postInfo.content,
            class: "max-w-xs overflow-hidden whitespace-nowrap text-ellipsis"
        },
        {
            key: "_id",
            title: "操作",
            renderComponent: {
                component: ReportButtonGroup,
                props: {
                    deleteCallback: (r) => {
                        rows = rows.filter((row) => row._id !== r._id);
                    }
                }
            }
        }
    ];

    let rows = [];
    onMount(async () => {
        rows = await getAllReports();
    });
</script>

<div class="flex flex-col flex-1">
    <div class="flex-1 report-table"><Table {rows} {columns} /></div>
</div>
