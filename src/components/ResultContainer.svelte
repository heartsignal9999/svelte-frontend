<!-- src/components/ResultContainer.svelte -->
<script lang="ts">
  import {
    originalAudioUrl,
    isRecording,
    originalImgUrl,
    isProcessing,
    hasMurmurProb,
    segmentedImageUrl,
    grayColumns,
    whiteColumns,
    isHeartsoundProb,
  } from "../stores/pageHeartSignalStore";
</script>

<div id="resultContainer" class="container mx-auto mt-5">
  {#if $isProcessing}
    <div class="flex justify-center items-center p-4">
      <img
        src="public/img/spinner-heart-gif.png"
        alt="Your Heart is Pumping"
        class="w-20"
      />
    </div>
  {/if}

  {#if !$isRecording && !$isProcessing}
    <div class="text-center mb-4">
      {#if !$hasMurmurProb}
        {#if $originalImgUrl}
          <img
            src={$originalImgUrl}
            alt="Original Spectrogram"
            class="mx-auto mb-3"
          />
        {/if}
      {:else}
        <img
          src={$segmentedImageUrl}
          alt="Segmented Spectrogram"
          class="mx-auto mb-3"
        />

        <div class="text-sm">
          <div>
            <span class="font-semibold">그레이 칼럼:</span> {$grayColumns}
          </div>
          <div>
            <span class="font-semibold">화이트 칼럼:</span> {$whiteColumns}
          </div>

          {#if $grayColumns.length + $whiteColumns.length < 5}
            <br />
            <div>
              분당 평균 심박수: 죄송합니다. 소리가 불분명해 정확히 계측할 수
              없습니다.
            </div>
          {:else}
            <div>
              <span class="font-semibold">분당 평균 심박수:</span> N회
            </div>
          {/if}

          <div>
            심박수 정확도는 심장음 녹음 점수(현재
            <span class="font-semibold">{Math.floor($isHeartsoundProb * 1000) / 10}점</span>)에 따라 달라질 수
            있습니다.
          </div>

          <div>
            <span class="font-semibold">심잡음 존재 가능성:</span>
            {Math.floor($hasMurmurProb * 1000) / 10}%
          </div>
        </div>
      {/if}
    </div>
{#if $originalAudioUrl}
    <div class="d-flex justify-content-center">
      <audio src={$originalAudioUrl} controls></audio>
    </div>
    {/if}
  {/if}
</div>

{#if $isProcessing}
  <div id="processedResult" class="text-center">처리중입니다.</div>
{/if}