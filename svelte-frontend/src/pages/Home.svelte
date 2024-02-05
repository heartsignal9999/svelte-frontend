<script lang="ts">
    import { push } from "svelte-spa-router";

    function navigateToHeartSignal() {
        push("/heartsignal");
    }
</script>

<style>
  :root {
    --color-heart-signal-pink: #eea4ce;
    --color-heart-signal-blue: #92a3fd;
  }

  .custom-button {
    background-image: linear-gradient(to right, var(--color-heart-signal-pink), var(--color-heart-signal-blue));
  }
</style>

<main
    class="flex flex-col justify-between items-center min-w-[320px] min-h-screen bg-[#242424] text-white dark:bg-white dark:text-[#213547] px-4"
>
  <div class="flex-grow flex justify-center items-center">
    <div class="text-center">
      <div class="text-4xl font-bold mb-1">
        <span class="text-[var(--color-heart-signal-pink)]">Heart</span>
        <span class="text-[var(--color-heart-signal-blue)]">Signal</span>
      </div>
      <div class="text-xl text-[#7b6f72] font-bold">
        당신의 심장❤️에 귀기울여보세요
      </div>
    </div>
  </div>

  <button
    on:click={navigateToHeartSignal}
    class="w-full m-4 p-2 text-white text-xl font-bold py-2 px-4 rounded custom-button"
  >
    시작하기
  </button>
</main>
