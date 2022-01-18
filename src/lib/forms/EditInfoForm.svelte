<script lang="ts">
    import { editUserInfo, User } from "../../models/users";
    import { onMount } from "svelte";

    import { loginInfo, message } from "../../store";
    import { getModalContext } from "../utils";

    export let user: User;
    let username: string, nickname: string, avatar: string;
    onMount(() => {
        username = user.username;
        nickname = user.nickname;
        avatar = user.avatar;
    });

    const isFormLegal = () => {
        let legal = false;
        if (!nickname) {
            message.error("请输入用户名");
        } else {
            legal = true;
        }
        return legal;
    };

    const { close } = getModalContext("modal");
    const handleSubmit = async () => {
        if (!isFormLegal()) return;
        const data = await editUserInfo(user, {
            nickname,
            avatar
        });
        if (data) {
            message.success("修改成功");
            loginInfo.login(data);
            close();
        }
    };
</script>

<div class="form-control">
    <label for="username" class="mb-4 font-semibold">用户名</label>
    <input
        disabled
        required
        type="text"
        name="username"
        id="username"
        class="input input-bordered"
        bind:value={username}
    />
</div>
<div class="form-control mt-6">
    <label for="nickname" class="mb-4 font-semibold">昵称</label>
    <input
        type="text"
        name="nickname"
        id="nickname"
        class="input input-bordered"
        bind:value={nickname}
    />
</div>
<div class="form-control mt-6">
    <label for="avatar" class="mb-4 font-semibold">头像图片地址</label>
    <input
        type="text"
        name="avatar"
        id="avatar"
        class="input input-bordered"
        bind:value={avatar}
    />
</div>
<div class="modal-action">
    <button class="btn btn-primary" on:click={handleSubmit}>修改</button>
    <button class="btn" on:click={close}>取消</button>
</div>
