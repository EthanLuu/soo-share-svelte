<script lang="ts">
    import { getPostStatistics, getStatistics } from "../../models/statistics";
    import { onMount } from "svelte";
    import Loading from "../../lib/Loading.svelte";
    import Echart from "../../lib/Echart.svelte";
    import type { EChartsOption } from "echarts";

    let data;
    let postData: Map<string, number>;
    const option: EChartsOption = {
        title: {
            text: "近期碎片发布统计",
            padding: 16
        },
        xAxis: {
            type: "category",
            data: []
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: null,
                type: "line"
            }
        ]
    };
    onMount(async () => {
        data = await getStatistics();
        postData = await getPostStatistics();
        let x = Array.from(postData.keys());
        x.sort();
        if (x.length > 14) {
            x = x.slice(x.length - 14);
        }
        const y = [];
        for (let key of x) {
            y.push(postData.get(key));
        }
        option.xAxis = {
            type: "category",
            data: x
        };
        option.series = [
            {
                data: y,
                type: "line"
            }
        ];
    });
</script>

<div class="flex justify-center items-center flex-col w-full">
    {#if !data}
        <Loading />
    {:else}
        <div class="flex flex-wrap w-full justify-around items-center">
            <div class="shadow stats bg-primary text-primary-content m-1">
                <div class="stat place-items-center">
                    <div class="stat-title opacity-90">用户数</div>
                    <div class="stat-value">{data?.userCnt || 0}</div>
                </div>
                <div class="stat place-items-center">
                    <div class="stat-title opacity-90">碎片数</div>
                    <div class="stat-value">{data?.postCnt || 0}</div>
                </div>
                <div class="stat place-items-center">
                    <div class="stat-title opacity-90">标签数</div>
                    <div class="stat-value">{data?.tagCnt || 0}</div>
                </div>
            </div>
            <div class="shadow stats bg-accent text-primary-content m-1">
                <div class="stat place-items-center">
                    <div class="stat-title opacity-90">点赞数</div>
                    <div class="stat-value">{data?.likeCnt || 0}</div>
                </div>
                <div class="stat place-items-center">
                    <div class="stat-title opacity-90">收藏数</div>
                    <div class="stat-value">{data?.bookmarkCnt || 0}</div>
                </div>
                <div class="stat place-items-center">
                    <div class="stat-title opacity-90">关注数</div>
                    <div class="stat-value">{data?.subscribeCnt || 0}</div>
                </div>
            </div>
        </div>

        <div class="w-full bg-white border mt-4">
            <Echart {option} id="echart" height={"50vh"} />
        </div>
    {/if}
</div>
