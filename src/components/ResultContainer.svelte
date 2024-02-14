<script lang="ts">
  import {
    originalAudioUrl,
    isRecording,
    originalImgUrl,
  } from "../stores/pageHeartSignalStore";
</script>

{#if $originalAudioUrl && !$isRecording}
  <div id="resultContainer" class="mt-5">
    <img src={$originalImgUrl} alt="Spectrogram" class="mb-3" />
    <audio src={$originalAudioUrl} controls></audio>
  </div>
{/if}
