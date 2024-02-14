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
  } from "../stores/pageHeartSignalStore";
  import type { ButtonProps } from "../stores/pageHeartSignalStore"; // 타입만 import
  import { updateTimer } from "../utils/timer";
  import { handleMicrophoneAccessError } from "../utils/errorHandler";
  import type { Writable } from 'svelte/store';
  import { API_ENDPOINTS } from '../config/apiConfig';

  function setButtonProps(props: Writable<ButtonProps>, classes: string, text: string, disabled: boolean) {
  props.set({ classes, text, disabled });
}
  function stopRecording() {
    $mediaRecorder?.stop();
  }
  
  async function uploadRecording() {
    const audioBlob = new Blob($audioChunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audioFile", audioBlob);

    try {
      const response = await fetch(
        API_ENDPOINTS.uploadAudio,
        {
          method: "POST",
          body: formData,
        }
      );

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
    setButtonProps(recordButtonProps, "bg-gray-500", "녹음 종료", false);

    uploadRecording()
      .then(() => {
        isRerecording.set(true);
        showAnalyzeButton.set(true);
        setButtonProps(recordButtonProps, "bg-blue-500 hover:bg-blue-700", "녹음 다시 하기", false);
        setButtonProps(analyzeButtonProps, "bg-green-500 hover:bg-green-700","심장음 분석하기",false);
        statusText.set(
          "심장음 파일 분석을 위한 전처리가 완료되었습니다. <br>심장음이 잘 녹음되었는지 재생 버튼을 눌러 확인해보세요."
        );
      })
      .catch((error) => {
        console.error("Error during upload:", error);
        statusText.set("Upload failed.");
        setButtonProps(recordButtonProps, "bg-blue-500 hover:bg-blue-700", "녹음 다시 하기", false);
      });
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
      setButtonProps(recordButtonProps, "bg-blue-500 hover:bg-blue-700", "녹음 시작", false);
      throw error;
    }
  }

  async function startRecording() {
    if (!navigator.mediaDevices) {
      handleMicrophoneAccessError();
      return;
    }

    $isRerecording
      ? analyzeButtonProps.update((props) => ({
          ...props,
          classes: "bg-gray-500",
        }))
      : showAnalyzeButton.set(false);

    statusText.set("심장음 녹음을 위해 마이크 접근을 허용해주세요.");
    setButtonProps(recordButtonProps, "bg-gray-500", "허용 대기중", false);
    $audioChunks = [];

    try {
      const stream = await getUserMedia();
      console.log(stream);

      $mediaRecorder
        ? $mediaRecorder.start()
        : statusText.set(
            "죄송합니다. 녹음을 시작할 수 없습니다. 다른 스마트 기기로 다시 시도해보세요."
          );

      isRecording.set(true);
      timerDisplay.set("0:00");
      $startTime = Date.now();
      $timerInterval = setInterval(updateTimer, 1000);
      setButtonProps(recordButtonProps, "bg-red-500 hover:bg-red-700", "녹음 종료", false);
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
  class="m-4 p-2 text-white text-xl py-2 px-4 rounded font-bold {$recordButtonProps.classes} {$showAnalyzeButton
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
