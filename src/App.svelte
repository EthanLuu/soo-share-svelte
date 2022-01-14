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
    const routes = {
        "/": Home,
        "/recommend": Recommend,
        "/register": Register,
        "/login": Login,
        "*": NotFound
    };

    onMount(async () => {
        const user = await getCurrentUser();
        if (user) {
            loginInfo.login(user);
        }
    });
</script>

<Header />
<main class="flex-1">
    <Router {routes} />
</main>
<Footer />
