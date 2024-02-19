<!-- src/Pages/AnalyzeButton.svelte -->
<script lang="ts">
  import { showAnalyzeButton, analyzeButtonProps } from '../stores/pageHeartSignalStore';
  import { modalTitle, modalContent, showModal } from '../stores/modalStore';

  function analyzeRecording() {
    modalTitle.set("심장음 분석을 진행합니다.");
    modalContent.set(`<img src="public/example.png" alt="Example"/><p>분석은 위와 같이 제공되며, 분석 결과는 테스트 기간 동안 보관됩니다. 분석을 진행하시겠습니까?</p>`);
    showModal.set(true);
  }

  function handleClick() {
    analyzeRecording();
  }
</script>

{#if $showAnalyzeButton}
  <button
    id="analyzeButton"
    class="flex-grow m-4 p-2 text-white text py-2 px-4 rounded font-bold {$analyzeButtonProps.classes}"
    on:click={handleClick}
    disabled={$analyzeButtonProps.disabled}
  >
    {$analyzeButtonProps.text}
  </button>
{/if}
