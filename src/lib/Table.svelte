<script lang="ts">
    import SvelteTable from "svelte-table";
    export let rows: any[];
    export let columns: any[];
</script>

<div class="table-bg border">
    <SvelteTable {columns} {rows} classNameTable="table table-auto" classNameTbody="" classNameThead="text-md overflow-hidden"/>
</div>
