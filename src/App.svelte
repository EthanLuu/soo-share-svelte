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
    import { loginByToken } from "./models/users";
    import { loginInfo } from "./store";
    import { createModalContext } from "./lib/utils";
    import User from "./pages/User.svelte";
    import Message from "./lib/Message.svelte";
    import Modal from "./lib/Modal.svelte";
    const routes = {
        "/": Home,
        "/recommend": Recommend,
        "/register": Register,
        "/login": Login,
        "/user/:username": User,
        "*": NotFound
    };
    createModalContext("modal", false);
    onMount(async () => {
        const user = await loginByToken();
        if (user) {
            loginInfo.login(user);
        }
    });
</script>

<Header />
<main class="flex-1">
    <Modal />
    <Message />
    <div class="h-full bg-base-200 flex flex-col">
        <Router {routes} />
    </div>
</main>
<Footer />
