<!-- src/Pages/HeartSignal.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import Modal from './Modal.svelte';
    
    let showModal = false;
    let modalTitle = '';
    let modalContent = '';
  
    let isRecording = false;
    let showAnalyzeButton = false;
    let isRerecording = false;
    let mediaRecorder: MediaRecorder | null = null;
    let audioChunks: Blob[] = [];
    let startTime: number;
    let timerInterval: number;
  
    const statusText = writable<string>('녹음 준비가 완료되었습니다.');
    const timerDisplay = writable<string>('00:00');
    const recordButtonProps = writable({
      classes: 'bg-blue-500 hover:bg-blue-700',
      text: '녹음 시작',
      disabled: false,
    });
    const analyzeButtonProps = writable({
      classes: 'hidden',
      text: '심장음 분석하기',
      disabled: false,
    });
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
      if (!navigator.mediaDevices) {
        statusText.set('마이크 접근 권한을 얻지 못했습니다. 권한 승인 후 다시 시도하세요.');
        return;
      }
  
      isRerecording ? analyzeButtonProps.update(props => ({ ...props, classes: 'bg-gray-500' }))
                    : showAnalyzeButton = false;
      statusText.set('심장음 녹음을 위해 마이크 접근을 허용해주세요.');
      recordButtonProps.set({ classes: 'bg-gray-500', text: '허용 대기중', disabled: false });
      audioChunks = [];
  
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
        mediaRecorder.onstop = handleStopRecording;
        mediaRecorder.start();
  
        isRecording = true;
        timerDisplay.set('0:00');
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
  
        recordButtonProps.set({ classes: 'bg-red-500 hover:bg-red-700', text: '녹음 종료', disabled: false });
        statusText.set('녹음 중입니다. 10초 이상 심장음을 녹음하세요.');
      } catch (error) {
        console.error('Error accessing the microphone:', error);
        statusText.set('마이크 접근 권한을 얻지 못했습니다. 권한 승인 후 다시 시도하세요.');
        recordButtonProps.set({ text: '녹음 실패', classes: 'bg-blue-500 hover:bg-blue-700', disabled: false });
      }
    }
  
    function handleStopRecording() {
    isRecording = false;
    clearInterval(timerInterval);
    recordButtonProps.set({ classes: 'bg-gray-500', text: '녹음 종료', disabled: true });
  
    uploadRecording()
      .then(() => {
        isRerecording = true;
        showAnalyzeButton = true;
        recordButtonProps.set({ classes: 'bg-blue-500 hover:bg-blue-700', text: '녹음 다시 하기', disabled: false });
        analyzeButtonProps.set({ classes: 'bg-green-500 hover:bg-green-700', text: '심장음 분석하기', disabled: false });
        statusText.set('심장음 파일 분석을 위한 전처리가 완료되었습니다. <br>심장음이 잘 녹음되었는지 재생 버튼을 눌러 확인해보세요.');
      })
      .catch((error) => {
        console.error('Error during upload:', error);
        statusText.set('Upload failed.');
        recordButtonProps.set({ classes: 'bg-blue-500 hover:bg-blue-700', text: '녹음 다시 하기', disabled: false });
      });
  }
  
  
    function stopRecording() {
      mediaRecorder?.stop();
    }
  
    async function fetchAuthToken() {
    try {
      const endpoint = 'https://asia-northeast3-heartsignal-webapp.cloudfunctions.net/wav-to-img-upload';
      const audience = endpoint;
  
      // fetch 요청을 POST로 변경
      const tokenResponse = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // 적절한 Content-Type 헤더 추가
        },
        body: `endpoint=${encodeURIComponent(endpoint)}&audience=${encodeURIComponent(audience)}`  // body 데이터 추가
      });
  
      if (!tokenResponse.ok) throw new Error('Failed to fetch auth token');
  
      const tokenData = await tokenResponse.json();
      return tokenData;
    } catch (error) {
      console.error('Error fetching auth token:', error);
      throw error;
    }
  }
  
    async function uploadRecording() {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audioFile', audioBlob);
  
      try {
        const authToken = await fetchAuthToken();
        const response = await fetch('https://asia-northeast3-heartsignal-webapp.cloudfunctions.net/wav-to-img-upload', {
          method: 'POST',
          headers: {
          'Authorization': `Bearer ${authToken}`
        },
          body: formData,
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
  
        const data = await response.json();
        audioUrl.set(data.audioUrl);
        imageUrl.set(data.imageUrl);
      } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error; // Re-throw the error to propagate it to the caller
      }
    }
    
    async function analyzeRecording() {
      modalTitle = '심장음 분석을 진행합니다.';
      modalContent = `<img src="public/example.png" alt="Example"/><p>분석은 위와 같이 제공되며, 분석 결과는 테스트 기간 동안 보관됩니다. 분석을 진행하시겠습니까?</p>`;
      showModal = true;
    }
  
    function handleConfirm() {
      alert('아직 준비중입니다. 스미마셍~');
      showModal = false;
    }
  
    function handleCancel() {
      showModal = false;
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
        {#if !$audioUrl || isRecording}
          <img src="public/heartsignal.png" alt="Heart Signal"/>
        {/if}
        <div id="description" class="text-center">
          스마트폰 마이크를 심장 부근(왼쪽 가슴 아래 늑골)에 붙이고 녹음하세요.
        </div>
      </div>
      <div id="resultContainer" class="mt-5" style="margin-bottom: 100px;"></div>
    </div>
    {#if $audioUrl && !isRecording}
      <div id="resultContainer" class="mt-5">
        <img src={$imageUrl} alt="Spectrogram" class="mb-3" />
        <audio src={$audioUrl} controls></audio>
      </div>
    {/if}
    <div id="status" class="text-lg mb-3 text-center">
      {@html $statusText}
    </div>
    <div class="flex justify-center w-full">
      <button
        id="recordButton"
        class="m-4 p-2 text-white text-xl py-2 px-4 rounded font-bold {$recordButtonProps.classes} {showAnalyzeButton ? 'w-1/2' : 'w-full'}  mx-0"
        on:click={isRecording ? stopRecording : startRecording}
        disabled={$recordButtonProps.disabled}
      >
        {#if isRecording}
          <span id="timer" class="font-normal">{$timerDisplay}</span>
        {/if}
        {$recordButtonProps.text}
      </button>
  
    
      {#if showAnalyzeButton}
        <button
          id="analyzeButton"
          class="flex-grow m-4 p-2 text-white text-xl py-2 px-4 rounded custom-button font-bold {$analyzeButtonProps.classes}"
          on:click={analyzeRecording}
          disabled={$analyzeButtonProps.disabled}
        >
          {$analyzeButtonProps.text}
        </button>
      {/if}
    </div>
  
    <Modal 
    show={showModal}
    title={modalTitle}
    content={modalContent}
    onConfirm={handleConfirm}
    onCancel={handleCancel}
  />
  </main>
  