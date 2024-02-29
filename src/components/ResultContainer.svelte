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
      <!-- Spinner 이미지에 애니메이션과 그림자 추가 -->
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
          <!-- 이미지에 그림자와 둥근 모서리 추가 -->
          <img
            src={$originalImgUrl}
            alt="Original Spectrogram"
            class="mx-auto mb-3 rounded-lg shadow-md"
          />
        {/if}
      {:else}
        <!-- 세그먼티드 이미지 스타일링 -->
        <img
          src={$segmentedImageUrl}
          alt="Segmented Spectrogram"
          class="mx-auto mb-3 rounded-lg shadow-md"
        />

        <div class="text-sm bg-gray-100 p-4 rounded-lg shadow">
          <!-- 정보 텍스트 스타일링 -->
          <!-- <div class="font-semibold text-gray-700">
            <span class="text-heart-signal-blue">그레이 칼럼:</span> {$grayColumns}
          </div>
          <div class="font-semibold text-gray-700">
            <span class="text-heart-signal-pink">화이트 칼럼:</span> {$whiteColumns}
          </div> -->

          {#if $grayColumns.length + $whiteColumns.length < 5}
            <br />
            <div class="text-red-500">
              분당 평균 심박수: 죄송합니다. 소리가 불분명해 정확히 계측할 수 없습니다.
            </div>
          {:else}
            <div class="font-semibold text-gray-700">
              <span class="text-heart-signal-blue">분당 평균 심박수:</span> 69회

              
            </div>
          {/if}

          <div class="text-gray-600">
            심박수 정확도는 심장음 녹음 점수(현재
            <span class="font-semibold text-heart-signal-pink">{Math.floor($isHeartsoundProb * 1000) / 10}점</span>)에 따라 달라질 수 있습니다.
          </div>

          <div class="font-semibold text-gray-700">
            <span class="text-heart-signal-blue">심잡음 존재 가능성:</span>
            {Math.floor($hasMurmurProb * 1000) / 10}%
          </div>
        </div>
      {/if}
    </div>

    {#if $originalAudioUrl}
      <div class="flex justify-center">
        <audio src={$originalAudioUrl} controls class="rounded-full shadow"></audio>
      </div>
    {/if}
  {/if}
</div>

{#if $isProcessing}
  <div id="processedResult" class="text-center text-heart-signal-blue">처리중입니다.</div>
{/if}