<!-- src/Pages/AnalyzeButton.svelte -->
<script lang="ts">
  import {
    showAnalyzeButton,
    analyzeButtonProps,
  } from "../stores/pageHeartSignalStore";
  import { modalTitle, modalContent, showModal } from "../stores/modalStore";

  function analyzeRecording() {
    modalTitle.set("심장음 분석을 진행합니다.");
    modalContent.set(
      `<img src="example.png" alt="Example"/><p>분석결과는 위와 같이 제공됩니다.<br>분석을 진행하시겠습니까?</p>`
    );
    showModal.set(true);
  }
</script>

{#if $showAnalyzeButton}
  <button
    id="analyzeButton"
    class="m-4 p-3 text-white text-base font-semibold rounded-lg 
    {$analyzeButtonProps.classes} transition-colors 
          w-full md:w-1/2" 
    on:click={analyzeRecording}
    disabled={$analyzeButtonProps.disabled}>
    {$analyzeButtonProps.text}
  </button>
{/if}
