<script>
    import Search from "./pages/Search.svelte";
    import Header from "./lib/Header.svelte";
    import Footer from "./lib/Footer.svelte";
    import Home from "./pages/Home.svelte";
    import Router from "svelte-spa-router";
    import NotFound from "./pages/NotFound.svelte";
    import Register from "./pages/Register.svelte";
    import Login from "./pages/Login.svelte";
    import { onMount } from "svelte";
    import { loginByToken } from "./models/users";
    import { loginInfo } from "./store";
    import { createModalContext } from "./lib/utils";
    import User from "./pages/User.svelte";
    import Message from "./lib/Message.svelte";
    import Modal from "./lib/Modal.svelte";
    import Subscribe from "./pages/Subscribe.svelte";
    import Bookmark from "./pages/Bookmark.svelte";
    import { updateBookmarkedList } from "./models/bookmarks";
    import { updateSubscribeList } from "./models/subscribes";
    import Loading from "./lib/Loading.svelte";
    import Management from "./pages/management/Index.svelte";
    const routes = {
        "/": Home,
        "/bookmark": Bookmark,
        "/subscribe": Subscribe,
        "/register": Register,
        "/login": Login,
        "/user/:username": User,
        "/search/:searchKey": Search,
        "/management/:tabKey?": Management,
        "*": NotFound
    };
    let loading = true;
    createModalContext("modal", false);
    onMount(async () => {
        const user = await loginByToken();
        if (user) {
            loginInfo.login(user);
            await updateBookmarkedList(user);
            await updateSubscribeList(user);
        }
        loading = false;
    });
</script>

<Header />
<main class="flex-1 flex">
    <Modal />
    <Message />
    <div class="flex-1 bg-base-200 flex flex-col overflow-hidden">
        {#if loading}
            <Loading />
        {:else}
            <Router {routes} />
        {/if}
    </div>
</main>
<Footer />
