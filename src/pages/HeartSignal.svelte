<!-- src/HeartSignal.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  let isRecording = false;
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];
  let startTime: number;
  let timerInterval: number;

  const statusText = writable<string>('녹음 준비가 완료되었습니다.');
  const timerDisplay = writable<string>('00:00');
  const recordButtonClasses = writable<string>('bg-blue-500 hover:bg-blue-700');
  const recordButtonText = writable<string>('새로운 녹음 시작');
  const audioUrl = writable<string | null>(null);
  const imageUrl = writable<string | null>(null);

  onMount(() => {
    statusText.set('녹음 준비가 완료되었습니다.');
  });

  onDestroy(() => {
    clearInterval(timerInterval);
  });

  function updateTimer() {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.set(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = handleStopRecording;
      mediaRecorder.start();
      isRecording = true;
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 1000);

      statusText.set('녹음 중입니다. 10초 이상 심장음을 녹음하세요.');
      recordButtonClasses.set('bg-red-500 hover:bg-red-700');
      recordButtonText.set('녹음 종료');
    } catch (error) {
      console.error('Error accessing the microphone:', error);
      statusText.set('마이크 접근 권한을 얻지 못했습니다. 권한 승인 후 다시 시도하세요.');
    }
  }

  function handleStopRecording() {
    clearInterval(timerInterval);
    isRecording = false;
    uploadRecording();
    statusText.set('녹음파일 처리중...');
    recordButtonClasses.set('bg-blue-500 hover:bg-blue-700');
    recordButtonText.set('새로운 녹음 시작');
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }

  async function uploadRecording() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audioFile', audioBlob);

    try {
      const response = await fetch('https://heartsignal.one/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      audioUrl.set(data.audioUrl);
      imageUrl.set(data.imageUrl);
      statusText.set('녹음 업로드와 처리가 완료되었습니다.');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      statusText.set('Upload failed.');
    }
  }
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
        스마트폰 마이크를 심장 부근(왼쪽 가슴 아래 늑골)에 붙이고 녹음하세요.
      </div>
    </div>
    <div id="resultContainer" class="mt-5" style="margin-bottom: 100px;"></div>
  </div>
  {#if $audioUrl && $imageUrl}
    <div id="resultContainer" class="mt-5">
      <img src={$imageUrl} alt="Spectrogram" class="mb-3" />
      <audio src={$audioUrl} controls></audio>
    </div>
  {/if}
  <div id="status" class="text-lg mb-3 text-center">
    {$statusText}
  </div>
  <button
    id="recordButton"
    class="w-full m-4 p-2 text-white text-xl py-2 px-4 rounded custom-button font-bold {$recordButtonClasses}"
    on:click={isRecording ? stopRecording : startRecording}
  >
    {$recordButtonText}
  </button>
  {#if isRecording}
    <div id="timer" class="...">
      {$timerDisplay}
    </div>
  {/if}
</main>