<!-- src/Home.svelte -->
<script lang="ts">
    import { push } from "svelte-spa-router";
    import svelteLogo from "../assets/svelte.svg";
    import viteLogo from "../../public/vite.svg";

    function navigateToHeartSignal() {
        push("/heartsignal");
    }
</script>

<main
    class="flex justify-center items-center min-w-[320px] min-h-screen bg-[#242424] text-white dark:bg-white dark:text-[#213547]"
>
    <div class="flex">
        <a href="https://vitejs.dev" target="_blank" class="m-6">
            <img
                src={viteLogo}
                class="h-24 p-6 transition-all duration-300 filter hover:drop-shadow-[0_0_2em_#646cffaa]"
                alt="Vite Logo"
            />
        </a>
        <a href="https://svelte.dev" target="_blank" class="m-6">
            <img
                src={svelteLogo}
                class="h-24 p-6 transition-all duration-300 filter hover:drop-shadow-[0_0_2em_#ff3e00aa]"
                alt="Svelte Logo"
            />
        </a>
    </div>
    <h1 class="text-3xl leading-tight">Vite + Svelte</h1>

    <p class="m-4">
        Check out <a
            href="https://github.com/sveltejs/kit#readme"
            target="_blank"
            class="font-medium text-[#646cff] hover:text-[#535bf2] dark:text-blue-600 dark:hover:text-blue-400"
            >SvelteKit</a
        >, the official Svelte app framework powered by Vite!
    </p>
    <button
        on:click={navigateToHeartSignal}
        class="m-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
        Go to HeartSignal
    </button>
</main>
