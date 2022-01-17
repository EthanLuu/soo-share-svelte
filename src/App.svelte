<script>
    import Header from "./lib/Header.svelte";
    import Footer from "./lib/Footer.svelte";
    import Home from "./pages/Home.svelte";
    import Recommend from "./pages/Recommend.svelte";
    import Router from "svelte-spa-router";
    import NotFound from "./pages/NotFound.svelte";
    import Register from "./pages/Register.svelte";
    import Login from "./pages/Login.svelte";
    import { onMount } from "svelte";
    import { getCurrentUser } from "./models/users";
    import { loginInfo } from "./store";
    import { createModalContext } from "./lib/utils";
    import AddPost from "./lib/AddPost.svelte";
    import User from "./pages/User.svelte";
    import Message from "./lib/Message.svelte";
    const routes = {
        "/": Home,
        "/recommend": Recommend,
        "/register": Register,
        "/login": Login,
        "/user/:id": User,
        "*": NotFound
    };
    const { show } = createModalContext("add-post", false);
    onMount(async () => {
        const user = await getCurrentUser();
        if (user) {
            loginInfo.login(user);
        }
    });
</script>

<Header />
<main class="flex-1">
    {#if $show}
        <AddPost />
    {/if}
    <Message />
    <div class="h-full bg-base-200">
        <Router {routes} />
    </div>
</main>
<Footer />
