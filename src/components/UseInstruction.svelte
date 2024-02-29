<script lang="ts">
  import {
    originalAudioUrl,
    isRecording,
  } from "../stores/pageHeartSignalStore";
</script>

<div class="container mx-auto my-3">
  <div id="description" class="text text-center mb-4">
     <div>스마트폰 마이크를 심장 부근</div><div>(왼쪽 가슴 아래 늑골)에 붙여 녹음하세요.</div>
  </div>

  <div class="text-center"> 
    {#if !$originalAudioUrl || $isRecording}
       <img src="public/img/heartsignal.png" alt="Heart Signal" />
       <div class="text-xs text-gray-600 m-3">이미지 출처: "Cardiac auscultation using 
smartphones: a proof-of-concept study"
Si-Hyuck Kang, Byunggill Joe, Yeonyee Yoon, Goo-Yeong Cho, Insik Shin, Jung-Won Suh(2018)
</div>

    {/if}
  </div>
</div>
