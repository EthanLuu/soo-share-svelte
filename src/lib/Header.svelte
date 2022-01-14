<script lang="ts">
    import { loginInfo } from "../store";

    import { push } from "svelte-spa-router";

    import AvatarMenu from "./AvatarMenu.svelte";
    import SearchBar from "./SearchBar.svelte";

    const siteName = "🖖 Soo Share";
    const routes = [
        { key: "home", hash: "#/", name: "首页" },
        { key: "recommend", hash: "#/recommend", name: "推荐" }
    ];
    let hash = window.location.hash;
</script>

<header
    class:shadow-sm={hash !== "#/"}
    class="relative z-10 navbar dark:bg-neutral dark:text-neutral-content w-full dark:border-b-base-100 border-b pr-0"
>
    <div class="flex-1 px-2 mx-2 sm:flex-none hidden sm:block">
        <a href="#/">
            <h1 class="text-xl font-bold font-serif">{siteName}</h1>
        </a>
    </div>
    <div class="flex-1 px-2 mx-2 items-stretch">
        {#each routes as route}
            <a
                class:text-primary={route.hash === hash}
                class="btn btn-ghost btn-md text-base rounded-none"
                on:click={() => (hash = route.hash)}
                href={route.hash}
            >
                {route.name}
            </a>
        {/each}
    </div>
    <SearchBar class="mr-2 flex-1 max-w-sm hidden sm:block" />
    {#if $loginInfo.isLogin}
        <AvatarMenu />
    {:else}
        <div class="btn-group flex-nowrap mr-4">
            <button
                class="btn btn-accent dark:bg-opacity-80"
                on:click={() => push("/register")}>注册</button
            >
            <button
                class="btn btn-primary dark:bg-opacity-80"
                on:click={() => push("/login")}>登录</button
            >
        </div>
    {/if}
</header>
