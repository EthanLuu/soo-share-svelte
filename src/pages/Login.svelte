<script lang="ts">
    import LoginForm from "../lib/LoginForm.svelte";

    const title = "Soo Share";
    const info = "分享最新的，收获最好的";
</script>

<div
    class="bg-base-200 align-middle justify-center overflow-hidden relative h-full"
>
    <div
        class="flex-col justify-center hero-content lg:flex-row h-full max-w-full lg:justify-evenly"
    >
        <div class="text-center">
            <h1 class="mb-5 text-5xl font-bold">{title}</h1>
            <p class="mb-5">
                {info}
            </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <LoginForm />
            </div>
        </div>
    </div>
</div>
