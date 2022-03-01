<script lang="ts">
    import { getStatistics } from "../../models/statistics";

    import { onMount } from "svelte";
    import Loading from "../../lib/Loading.svelte";

    let data;
    onMount(async () => {
        data = await getStatistics();
    });
</script>

<div class="flex flex-wrap gap-4 justify-center items-center">
    {#if !data}
        <Loading />
    {:else}
        <div class="shadow stats bg-primary text-primary-content">
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
        <div class="shadow stats bg-accent text-primary-content">
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
    {/if}
</div>

<!-- <PostCard post={data?.post || {}} /> -->
