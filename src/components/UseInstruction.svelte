<script lang="ts">
  import {
    originalAudioUrl,
    isRecording,
  } from "../stores/pageHeartSignalStore";
</script>

<div class="container mx-auto my-3">
  <div id="description" class="text text-center mb-4">
     <div>Place your smartphone's microphone near your heart, </div><div>right below the left chest ribs.</div>
  </div>

  <div class="text-center"> 
    {#if !$originalAudioUrl || $isRecording}
       <img src="/img/heartsignal.png" alt="Heart Signal" />
       <div class="text-xs text-gray-600 m-3">Image Soruce: "Cardiac auscultation using 
smartphones: a proof-of-concept study"
Si-Hyuck Kang, Byunggill Joe, Yeonyee Yoon, Goo-Yeong Cho, Insik Shin, Jung-Won Suh(2018)
</div>

    {/if}
  </div>
</div>
