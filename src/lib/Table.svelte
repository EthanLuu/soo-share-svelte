<script lang="ts">
    import SvelteTable from "svelte-table";
    export let rows: any[];
    export let columns: any[];
</script>

<SvelteTable
    {columns}
    {rows}
    classNameTable="table"
/>