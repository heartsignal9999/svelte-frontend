<!-- src/components/ResultContainer.svelte -->
<script lang="ts">
  import {
    originalAudioUrl,
    isRecording,
    originalImgUrl,
    isProcessing,
    isHeartsoundProb,
    hasMurmur,
    hasMurmurProb,
  } from "../stores/pageHeartSignalStore";
</script>

{#if $originalAudioUrl && !$isRecording}
  <div id="resultContainer" class="mt-5">
    <img src={$originalImgUrl} alt="Spectrogram" class="mb-3" />
    <audio src={$originalAudioUrl} controls></audio>
    {#if $isHeartsoundProb}
      심장 소리 녹음점수: {Math.floor($isHeartsoundProb * 100)}점 (60점 이상일
      경우 분석가능)
    {/if}
  </div>
{/if}
{#if $isProcessing}
  <div id="processedResult">처리중입니다.</div>
{/if}
