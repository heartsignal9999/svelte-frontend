<!-- src/HeartSignal.svelte -->
<script lang="ts">
    import { onDestroy } from "svelte";
    let time = 0;
    let timer: ReturnType<typeof setInterval>;

    function startTimer() {
        timer = setInterval(() => {
            time++;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    startTimer();
    onDestroy(stopTimer);
</script>

<main>
    <h1>HeartSignal</h1>
    <p>Time: {time} seconds</p>
</main>
