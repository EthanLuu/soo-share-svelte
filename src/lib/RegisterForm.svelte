<script lang="ts">
    import { push } from "svelte-spa-router";

    import { addOneUser } from "../models/users";

    import { alertMessage, loginInfo } from "../store";
    let username: string, password: string, repeatedPassword: string;

    const isFormLegal = () => {
        let legal = false;
        if (!username) {
            alertMessage.set("请输入用户名");
        } else if (!password) {
            alertMessage.set("请输入密码");
        } else if (password !== repeatedPassword) {
            alertMessage.set("密码重复错误");
        } else {
            legal = true;
        }
        return legal;
    };

    const register = async () => {
        if (!isFormLegal()) {
            return;
        }
        const user = await addOneUser(username, password);
        if (!user) {
            alertMessage.set("注册失败");
        } else {
            loginInfo.login(user);
            push("/");
        }
    };
</script>

<div class="form-control">
    <input
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
