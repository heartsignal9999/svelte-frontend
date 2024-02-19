<!-- src/components/RecordButton.svelte -->
<script lang="ts">
  import {
    isRecording,
    showAnalyzeButton,
    timerDisplay,
    recordButtonProps,
    audioChunks,
    mediaRecorder,
    startTime,
    timerInterval,
    statusText,
    originalAudioUrl,
    originalImgUrl,
    isRerecording,
    analyzeButtonProps,
    isProcessing,
    isHeartsound,
    isHeartsoundProb,
    processedImgUrl,
  } from "../stores/pageHeartSignalStore";
  import { updateTimer } from "../utils/timer";
  import { setButtonProps } from "../utils/buttonPropSetter";
  import { handleMicrophoneAccessError } from "../utils/errorHandler";
  import { API_ENDPOINTS } from "../config/apiConfig";

  function stopRecording() {
    $mediaRecorder?.stop();
  }

  async function sendAudioUrl() {
    if ($originalAudioUrl === null) {
      console.error("No audio URL available");
      return;
    }
    const formData = new FormData();
    // Append the URL string directly
    formData.append("audioFileUrl", $originalAudioUrl);

    try {
      const response = await fetch(API_ENDPOINTS.processAudio, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      processedImgUrl.set(data.imageUrl);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  async function inferImg() {
    if ($processedImgUrl === null) {
      console.error("No audio URL available");
      return;
    }
    const formData = new FormData();
    // Append the URL string directly
    formData.append("imgFileUrl", $processedImgUrl);

    try {
      const response = await fetch(API_ENDPOINTS.inferenceAudio, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      isHeartsound.set(data.predicted_class);
      isHeartsoundProb.set(data.predicted_prob);

      if ($isHeartsoundProb > 0.6) {
        statusText.set(
          "심장음 분석을 위한 준비가 완료되었습니다. <br>잘 녹음되었는지 재생 버튼을 눌러 확인해본 후, 심장음 분석을 시작하세요."
        );
        setButtonProps(
    analyzeButtonProps,
    "custom-button",
    "심장음 분석",
    false
  );
      } else {
        statusText.set(
          `심장 소리 녹음 점수가 ${Math.floor(
            $isHeartsoundProb * 100
          )}점입니다. 심장소리가 더 잘 들리도록 다시 녹음해보세요.`
        );
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  async function uploadRecording() {
    const audioBlob = new Blob($audioChunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audioFile", audioBlob);

    try {
      const response = await fetch(API_ENDPOINTS.uploadAudio, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      originalAudioUrl.set(data.audioUrl);
      originalImgUrl.set(data.imageUrl);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  function handleStopRecording() {
    isRecording.set(false);

    $timerInterval && clearInterval($timerInterval);
    statusText.set(
      "녹음 파일을 그래프로 변환하고 있습니다. 다소 시간이 걸릴 수 있습니다."
    );
    setButtonProps(recordButtonProps, "bg-gray-500", "녹음 종료", true);
    setButtonProps(analyzeButtonProps, "bg-gray-500", "심장음 분석", true);
    isProcessing.set(true);
    uploadRecording()
      .then(() => {
        isRerecording.set(true);
        showAnalyzeButton.set(true);
        setButtonProps(
          recordButtonProps,
          "bg-blue-500 hover:bg-blue-700",
          "녹음 다시 하기",
          false
        );
        statusText.set(
          "녹음 파일 전처리가 완료되었습니다. 심장소리가 잘 들리는지 확인 중입니다..."
        );
        sendAudioUrl().then(() => {
          inferImg()
        });
      })
      .catch((error) => {
        console.error("Error during upload:", error);
        statusText.set("Upload failed.");
        setButtonProps(
          recordButtonProps,
          "bg-blue-500 hover:bg-blue-700",
          "녹음 다시 하기",
          false
        );
      });
    isProcessing.set(false);
  }

  async function getUserMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      $mediaRecorder = new MediaRecorder(stream);
      $mediaRecorder.ondataavailable = (event) => $audioChunks.push(event.data);
      $mediaRecorder.onstop = handleStopRecording;

      return stream;
    } catch (error) {
      console.error("Error accessing the microphone:", error);
      handleMicrophoneAccessError();
      setButtonProps(
        recordButtonProps,
        "bg-blue-500 hover:bg-blue-700",
        "녹음 시작",
        false
      );
      throw error;
    }
  }

  async function startRecording() {
    if (!navigator.mediaDevices) {
      handleMicrophoneAccessError();
      return;
    }

    $isRerecording
      ? setButtonProps(analyzeButtonProps, "bg-gray-500", "심장음 분석", true)
      : showAnalyzeButton.set(false);

    statusText.set("심장음 녹음을 위해 마이크 접근을 허용해주세요.");
    setButtonProps(recordButtonProps, "bg-gray-500", "허용 대기중", true);
    $audioChunks = [];

    try {
      const stream = await getUserMedia();
      console.log(stream);

      $mediaRecorder
        ? $mediaRecorder.start()
        : statusText.set(
            "죄송합니다. 녹음을 시작할 수 없습니다. 다른 스마트 기기로 다시 시도해보세요."
          );
      isHeartsoundProb.set(0);
      isRecording.set(true);
      timerDisplay.set("0:00");
      $startTime = Date.now();
      $timerInterval = setInterval(updateTimer, 1000);
      setButtonProps(
        recordButtonProps,
        "bg-red-500 hover:bg-red-700",
        "녹음 종료",
        false
      );
      statusText.set("녹음 중입니다. 10초 이상 심장음을 녹음하세요.");
    } catch (error) {
      // Error handling is already done in getUserMedia function
    }
  }

  function handleClick() {
    if ($isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }
</script>

<button
  id="recordButton"
  class="m-4 p-2 text-white text py-2 px-4 rounded font-bold {$recordButtonProps.classes} {$showAnalyzeButton
    ? 'w-1/2'
    : 'w-full'}  mx-0"
  on:click={handleClick}
  disabled={$recordButtonProps.disabled}
>
  {#if $isRecording}
    <span id="timer" class="font-normal">{$timerDisplay}</span>
  {/if}
  {$recordButtonProps.text}
</button>
