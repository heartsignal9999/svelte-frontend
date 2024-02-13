<script lang="ts">
  import {
    audioUrl,
    isRecording,
    imageUrl,
  } from "../stores/pageHeartSignalStore";
</script>

{#if $audioUrl && !$isRecording}
  <div id="resultContainer" class="mt-5">
    <img src={$imageUrl} alt="Spectrogram" class="mb-3" />
    <audio src={$audioUrl} controls></audio>
  </div>
{/if}
