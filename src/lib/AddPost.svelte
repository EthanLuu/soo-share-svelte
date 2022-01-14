<script lang="ts">
    import { addOnePost } from "../models/posts";
    import { loginInfo } from "../store";

    import { getContext } from "svelte";
    import Icon from "./Icon.svelte";
    import type { ModalContext } from "./utils";

    const { show, close } = getContext("add-post") as ModalContext;

    let content = "";
    let link = "";
    let cover = "";

    const contentMaxLength = 140;
    $: contentTooLong = content.length > contentMaxLength;

    const handleSubmit = async () => {
        const userId = $loginInfo.user.id;
        const data = await addOnePost({
            content,
            link,
            cover,
            userId
        });
        close();
    };
</script>

<div class="modal" class:open={$show}>
    <div class="modal-box">
        <div class="card-title">分享碎片</div>
        <div class="form-control relative">
            <textarea
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
                placeholder="链接"
                name="link"
                id="link"
                class="textarea textarea-bordered h-12"
                bind:value={link}
            />
        </div>
        <div class="form-control mt-6">
            <textarea
                type="text"
                placeholder="封面图片地址"
                name="cover"
                id="cover"
                class="textarea textarea-bordered h-12"
                bind:value={cover}
            />
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
