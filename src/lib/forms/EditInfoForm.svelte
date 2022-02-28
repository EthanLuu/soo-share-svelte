<script lang="ts">
    import { editUserInfo, User } from "../../models/users";
    import { onMount } from "svelte";

    import { loginInfo, message } from "../../store";
    import { getModalContext } from "../utils";
    import { getQiNiuToken, uploadImage } from "../../models/image";

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

    let avatarFile: File;

    const updateAvatar = (event: { target: any }) => {
        avatarFile = (event.target as any).files[0];
    };

    const handleSubmit = async () => {
        if (!isFormLegal()) return;
        let avatar: string;
        if (avatarFile) {
            avatar = await uploadImage(avatarFile, () => {});
        }
        const saveUser = await editUserInfo(user, {
            nickname,
            avatar
        });
        if (saveUser) {
            message.success("修改成功");
            loginInfo.login(saveUser);
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
    <label for="avatar" class="mb-4 font-semibold">上传头像</label>
    <input
        type="file"
        name="avatar"
        id="avatar"
        on:change={updateAvatar}
        accept="image/png, image/jpeg"
    />
</div>
<div class="modal-action">
    <button class="btn btn-primary" on:click={handleSubmit}>修改</button>
    <button class="btn" on:click={close}>取消</button>
</div>
