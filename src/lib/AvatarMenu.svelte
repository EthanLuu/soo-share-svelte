<script lang="ts">
    import { loginInfo } from "../store";
    import AddPost from "./AddPost.svelte";
    import Icon from "./Icon.svelte";
    import { createModalContext } from "./utils";
    const { open } = createModalContext("add-post", false);
    const { logout } = loginInfo;
</script>

<AddPost />
<div class="cursor-pointer">
    <div class="dropdown dropdown-end pr-4">
        <div class="avatar" tabindex="0">
            <div class="rounded-full w-10 h-10 m-1">
                <img src={$loginInfo.user.avatar} alt="avatar" />
            </div>
        </div>
        <div
            tabindex="0"
            class="shadow menu dropdown-content bg-base-100 rounded-sm w-36 mt-2"
        >
            <div class="flex items-center px-4 py-2 hover:bg-base-300" on:click={open}>
                <Icon name="write" class="stroke-current mr-2" />
                <span class="text-sm">发布碎片</span>
            </div>
            <div class="flex items-center px-4 py-2 hover:bg-base-300" on:click={logout}>
                <Icon name="write" class="stroke-current mr-2" />
                <span class="text-sm">退出登录</span>
            </div>
        </div>
    </div>
</div>
