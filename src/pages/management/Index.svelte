<script lang="ts">
    import NavBar from "../../lib/NavBar.svelte";
    import Tag from "./Tag.svelte";
    import Statistics from "./Statistics.svelte";
    import Report from "./Report.svelte";
    export let params: { tabKey?: string } = {};
    let activeComponent = Statistics;
    const navs = [
        {
            key: null,
            name: "概况",
            href: "/management",
            component: Statistics
        },
        {
            key: "tag",
            name: "标签管理",
            href: "/management/tag",
            component: Tag
        },
        {
            key: "report",
            name: "举报管理",
            href: "/management/report",
            component: Report
        }
    ];
    $: {
        navs.map((nav) => {
            if (nav.key === params.tabKey) {
                activeComponent = nav.component;
            }
        });
    }
</script>

<div class="flex-1 relative flex flex-col">
    <NavBar {navs} />
    <div class="container flex justify-center items-center py-4">
        <svelte:component this={activeComponent} />
    </div>
</div>
