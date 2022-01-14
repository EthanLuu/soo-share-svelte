<script lang="ts">
    import { push } from "svelte-spa-router";

    import { getUserByUsername } from "../models/users";

    import { alertMessage, loginInfo } from "../store";
    let username: string, password: string;

    const isFormLegal = () => {
        let legal = false;
        if (!username) {
            alertMessage.set("请输入用户名");
        } else if (!password) {
            alertMessage.set("请输入密码");
        } else {
            legal = true;
        }
        return legal;
    };

    const login = async () => {
        if (!isFormLegal()) {
            return;
        }
        const user = await getUserByUsername(username);
        if (!user || user.password !== password) {
            alertMessage.set("账户或密码错误");
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
        type="button"
        value="登录"
        class="btn btn-primary"
        on:click={login}
    />
</div>
