<!-- src/Pages/AnalyzeButton.svelte -->
<script lang="ts">
  import {
    showAnalyzeButton,
    analyzeButtonProps,
  } from "../stores/pageHeartSignalStore";
  import { modalTitle, modalContent, showModal } from "../stores/modalStore";

  function analyzeRecording() {
    modalTitle.set("Heart sound analysis will be in progress.");
    modalContent.set(
      `<img src="example.png" alt="Example"/><p>The results will be provided as above. <br>Proceed to analyze?</p>`
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
