<script lang="ts">
    import { push } from "svelte-spa-router";
    import { loginByPassword } from "../../models/users";
    import { message, loginInfo } from "../../store";
    import { isEnter } from "../utils";
    let username: string, password: string;
    const isFormLegal = () => {
        let legal = false;
        if (!username) {
            alert("请输入用户名");
        } else if (!password) {
            message.error("请输入密码");
        } else {
            legal = true;
        }
        return legal;
    };

    const login = async () => {
        if (!isFormLegal()) {
            return;
        }
        const user = await loginByPassword(username, password);
        if (!user) {
            message.error("账户或密码错误");
        } else {
            message.success("登录成功");
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
        on:keypress={(e) => isEnter(e, login)}
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
