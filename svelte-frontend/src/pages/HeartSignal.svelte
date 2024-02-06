<!-- src/HeartSignal.svelte -->
<script lang="ts">
</script>

<main
  class="flex flex-col justify-between items-center min-w-[320px] min-h-screen bg-[#242424] text-white dark:bg-white dark:text-[#213547] px-4"
>
  <div class="flex-grow flex justify-center items-center">
    <div class="my-1 text-center">
      <div class="text-4xl font-bold my-5 text-center">
        심음(heart sound) 녹음 & 분석
      </div>
      <div>현재 하트시그널은 베타테스트 중입니다.</div>
      <div>녹음하신 파일은 클라우드에 저장되며,</div>
      <div>테스트 기간(~2월 20일) 동안 보유됩니다.</div>
      <!-- Update the image src path as per your project structure -->
      <img src="public/heartsignal.png" alt="Heart Signal" class="mb-3" />
      <div id="description" class="text-center">
        스마트폰 마이크를 왼쪽 유두 아래 늑골에 붙이고 녹음하세요.
      </div>
    </div>
    <div id="resultContainer" class="mt-5" style="margin-bottom: 100px;"></div>
  </div>

  <div id="status" class="text-lg mb-3 text-center">
    녹음 준비가 완료되었습니다.
  </div>
  <button
    id="recordButton"
    class="w-full m-4 p-2 text-white text-xl py-2 px-4 rounded custom-button font-bold bg-blue-500 hover:bg-blue-700"
  >
    녹음 시작
  </button>
</main>
