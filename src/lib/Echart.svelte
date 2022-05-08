<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as echarts from "echarts";
    export let id = "container";
    export let theme = "";
    export let width: number | string = 200;
    export let height: number | string = 200;
    export let option = {};
    export let notMerge = false;
    export let lazyUpdate = false;

    let chart: echarts.ECharts;

    const setOption = () => {
        if (chart && !chart.isDisposed()) {
            chart.setOption(option, notMerge, lazyUpdate);
        }
    };

    const destroyChart = () => {
        if (chart && !chart.isDisposed()) {
            chart.dispose();
        }
    };

    const makeChart = () => {
        destroyChart();
        chart = echarts.init(document.getElementById(id), theme);
    };

    onMount(() => {
        makeChart();
    });

    onDestroy(() => {
        destroyChart();
    });

    let timer: NodeJS.Timeout;
    const handleResize = () => {
        if (!timer) {
            timer = setTimeout(() => {
                if (chart && !chart.isDisposed()) {
                    chart.resize();
                }
                timer = undefined;
            }, 100);
        }
    };

    $: width && handleResize();
    $: option && setOption();
    $: if (chart) {
        makeChart();
        setOption();
    }
</script>

<div bind:clientWidth={width}>
    <div
        {id}
        style="height: {typeof height === 'number' ? `${height}px` : height};"
    />
</div>
