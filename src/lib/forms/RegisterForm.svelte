<script lang="ts">
    import { push } from "svelte-spa-router";

    import { addOneUser } from "../../models/users";

    import { message, loginInfo } from "../../store";
    import { isEnter } from "../utils";
    let username: string,
        password: string,
        repeatedPassword: string,
        nickname: string;

    const isFormLegal = () => {
        let legal = false;
        if (!username) {
            message.error("请输入用户名");
        } else if (!nickname) {
            message.error("请输入昵称");
        } else if (!password) {
            message.error("请输入密码");
        } else if (password !== repeatedPassword) {
            message.error("密码重复错误");
        } else {
            legal = true;
        }
        return legal;
    };

    const register = async () => {
        if (!isFormLegal()) {
            return;
        }
        try {
            const user = await addOneUser(username, password, nickname);
            if (!user) {
                message.error("注册失败");
            } else {
                loginInfo.login(user);
                push("/");
            }
        } catch (error) {
            message.error(error)
        }
    };
</script>

<div class="form-control">
    <input
        required
        type="text"
        placeholder="用户名"
        name="username"
        id="username"
        class="input input-bordered"
        bind:value={username}
    />
</div>
<div class="form-control mt-6">
    <input
        type="text"
        placeholder="昵称"
        name="nickname"
        id="nickname"
        class="input input-bordered"
        bind:value={nickname}
    />
</div>
<div class="form-control mt-6">
    <input
        type="password"
        placeholder="密码"
        name="password"
        id="password"
        class="input input-bordered"
        bind:value={password}
    />
</div>
<div class="form-control mt-6">
    <input
        type="password"
        placeholder="重复密码"
        name="repeatedPassword"
        id="repeatedPassword"
        class="input input-bordered"
        bind:value={repeatedPassword}
        on:keypress={(e) => isEnter(e, register)}
    />
</div>
<div class="form-control mt-6">
    <input
        type="button"
        value="注册"
        class="btn btn-primary"
        on:click={register}
    />
</div>
