<!-- src/components/ResultContainer.svelte -->
<script lang="ts">
  import {
    originalAudioUrl,
    isRecording,
    originalImgUrl,
    isProcessing,
    processedImgUrl
  } from "../stores/pageHeartSignalStore";
</script>

{#if $originalAudioUrl && !$isRecording}
  <div id="resultContainer" class="mt-5">
    <img src={$originalImgUrl} alt="Spectrogram" class="mb-3" />
    <audio src={$originalAudioUrl} controls></audio>
  </div>
{/if}
{#if $isProcessing}
  <div id ="processedResult">
    처리중입니다.
  </div>
{/if}
{#if !$isProcessing && $processedImgUrl}
  <div id ="processedResult" class="mt-5">
    처리 완료되었습니다.
    <img src={$processedImgUrl} alt="Processed Spectrogram" class="mb-3" />
  </div>
{/if}
