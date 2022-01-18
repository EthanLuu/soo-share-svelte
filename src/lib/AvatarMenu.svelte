<script lang="ts">
    import { getContext } from "svelte";
    import { loginInfo } from "../store";
    import CreatePostForm from "./forms/CreatePostForm.svelte";
    import Icon from "./Icon.svelte";
    import type { ModalContext } from "./utils";
    const { logout } = loginInfo;
    const { open } = getContext("modal") as ModalContext;
</script>

<div>
    <div class="dropdown dropdown-end pr-4">
        <div class="cursor-pointer avatar" tabindex="0">
            <div
                class="rounded-full w-10 h-10 m-1 border border-base-300 bg-white"
            >
                <img src={$loginInfo.user.avatar} alt="avatar" />
            </div>
        </div>
        <div
            tabindex="0"
            class="shadow menu dropdown-content bg-base-100 rounded-sm w-36 mt-2"
        >
            <a
                class="flex items-center px-4 py-2 hover:bg-base-300 cursor-pointer"
                href={`/#/user/${$loginInfo.user.id}`}
            >
                <Icon name="user" class="stroke-current mr-2" />
                <span class="text-sm">我的主页</span>
            </a>
            <div
                class="flex items-center px-4 py-2 hover:bg-base-300 cursor-pointer"
                on:click={() => open(CreatePostForm)}
            >
                <Icon name="write" class="stroke-current mr-2" />
                <span class="text-sm">发布碎片</span>
            </div>
            <div
                class="flex items-center px-4 py-2 hover:bg-base-300 cursor-pointer"
                on:click={logout}
            >
                <Icon name="logout" class="stroke-current mr-2" />
                <span class="text-sm">退出登录</span>
            </div>
        </div>
    </div>
</div>
