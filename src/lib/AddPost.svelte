<script lang="ts">
    import { addOnePost } from "../models/posts";
    import { message, loginInfo } from "../store";

    import { getContext, onMount } from "svelte";
    import Icon from "./Icon.svelte";
    import type { ModalContext } from "./utils";
    import { getAllTags, Tag } from "../models/tags";

    const { show, close } = getContext("add-post") as ModalContext;

    let content = "";
    let link = "";
    let tags: Tag[] = [];
    let selectedTag = "";

    onMount(async () => {
        tags = await getAllTags();
    });
    const contentMaxLength = 140;
    $: contentTooLong = content.length > contentMaxLength;

    const handleSubmit = async () => {
        const data = await addOnePost({
            content,
            link,
            tag: selectedTag
        }, $loginInfo.user);
        if (data) {
            message.success("发布成功");
        }
        close();
    };

</script>

<div class="modal" class:open={$show}>
    <div class="modal-box">
        <div class="card-title">分享碎片</div>
        <div class="form-control relative">
            <textarea
                required
                type="text"
                placeholder="概要"
                name="content"
                id="content"
                class="textarea textarea-bordered max-h-48 h-32"
                bind:value={content}
            />
            <div
                class="absolute right-2 bottom-2 badge badge-ghost rounded-md"
                class:badge-error={contentTooLong}
            >
                {#if contentTooLong}
                    <Icon name="wrong" class="stroke-current" />
                {/if}
                {`${content.length}/${contentMaxLength}`}
            </div>
        </div>
        <div class="form-control mt-6">
            <textarea
                type="text"
                placeholder="链接（可留空）"
                name="link"
                id="link"
                class="textarea textarea-bordered h-12"
                bind:value={link}
            />
        </div>
        <div class="form-control mt-6">
            <label for="tag" class="text-base font-semibold">碎片标签</label>
            <div class="flex mt-3">
                {#each tags as tag}
                    <div
                        value={tag.key}
                        class:btn-outline={selectedTag !== tag.key}
                        on:click={() => (selectedTag = tag.key)}
                        class="btn mr-3"
                        name="tag"
                    >
                        {tag.name}
                    </div>
                {/each}
            </div>
        </div>
        <div class="modal-action">
            <button class="btn btn-primary" on:click={handleSubmit}>发布</button
            >
            <button class="btn" on:click={close}>取消</button>
        </div>
    </div>
</div>

<style>
    .open {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
    }
</style>
