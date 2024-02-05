<!-- src/HeartSignal.svelte -->
<script lang="ts">

</script>

<main class="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold my-5 text-center">
      심음(heart sound) 녹음 & 분석
    </h1>
    <div class="my-1 text-center">
        <div>현재 하트시그널은 베타테스트 중입니다.</div>
        <div>
          녹음하신 파일은 클라우드에 저장되며,
        </div>
        <div>테스트 기간(~2월 20일) 동안 보유됩니다.
        </div>
        <!-- Update the image src path as per your project structure -->
        <img src="public/heartman.webp" alt="Heart Signal" class="mb-3">
        <div id="description" class="text-center">스마트폰 마이크를 왼쪽 유두 아래 늑골에 붙이고 녹음하세요.</div>
    </div>
    <div id="resultContainer" class="mt-5" style="margin-bottom: 100px;">
    </div>
    <div class="fixed bottom-10 w-full bg-gray-200">
      <div id="status" class="text-lg mb-3 text-center">녹음 준비가 완료되었습니다.</div>
      <a id="recordButton" class="text-white text-center fixed left-2 bottom-2 right-2 py-2 rounded font-bold bg-blue-500 hover:bg-blue-700">
        녹음 시작
      </a>
</main>