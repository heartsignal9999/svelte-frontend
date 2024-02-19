<script lang="ts">
  import { originalAudioUrl, isRecording } from "../stores/pageHeartSignalStore";
</script>

<div class="my-5">
  <div id="description" class="text-sm text-center">
    스마트폰 마이크를 심장 부근(왼쪽 가슴 아래 늑골)에 붙이고 녹음하세요.
  </div>
  {#if !$originalAudioUrl || $isRecording}
    <img src="public/heartsignal.png" alt="Heart Signal" />
  {/if}
</div>
