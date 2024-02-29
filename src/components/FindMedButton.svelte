<!-- src/Pages/FindMedButton.svelte -->
<script lang="ts">
  import {
    showFindMedButton,
    findMedButtonProps
  } from "../stores/pageHeartSignalStore";
  import { modalTitle, modalContent, showModal } from "../stores/modalStore";

  function findMed() {
    modalTitle.set("가까운 병원을 찾아볼까요?");
    modalContent.set(
      `<img src="public/example.png" alt="Example"/><p>확인 버튼을 누르면 위치정보 허용을 요청합니다.<br> '예'를 누르고 위치정보를 허용해주세요.</p>`
    );
    showModal.set(true);
  }
</script>

{#if $showFindMedButton}
  <button
    id="findMedButton"
    class="m-4 p-3 text-white text-base font-semibold rounded-lg 
    {$findMedButtonProps.classes} transition-colors 
          w-full md:w-1/2" 
    on:click={findMed}
    disabled={$findMedButtonProps.disabled}>
    {$findMedButtonProps.text}
  </button>
{/if}
