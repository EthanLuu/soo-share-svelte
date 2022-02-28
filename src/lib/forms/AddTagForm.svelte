<script lang="ts">
    import { addTag } from "./../../models/tags";
    import { getContext } from "svelte";
    import type { ModalContext } from "../utils";
    import { message } from "../../store";

    let key = "";
    let name = "";

    const { close } = getContext("modal") as ModalContext;
    const handleSubmit = async () => {
        const data = await addTag({ key, name });
        if (data) {
            message.success("添加成功");
            close();
        }
    };
</script>

<div class="card-title">添加标签</div>
<div class="form-control mt-6">
    <input
        required
        type="text"
        placeholder="key"
        name="key"
        id="key"
        class="input input-bordered"
        bind:value={key}
    />
</div>
<div class="form-control mt-6">
    <input
        required
        type="text"
        placeholder="显示名称"
        name="name"
        id="name"
        class="input input-bordered"
        bind:value={name}
    />
</div>
<div class="modal-action">
    <button class="btn btn-primary" on:click={handleSubmit}>添加</button>
    <button class="btn" on:click={close}>取消</button>
</div>
