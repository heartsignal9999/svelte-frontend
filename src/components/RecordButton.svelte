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
    mediaStream,
    segmentedImageUrl,
    hasMurmur,
    hasMurmurProb,
    grayColumns,
    whiteColumns,
    uploadButtonProps,
  } from "../stores/pageHeartSignalStore";
  import { updateTimer } from "../utils/timer";
  import { disableButton, enableButton, setButtonProps } from "../utils/buttonPropSetter";
  import { handleMicrophoneAccessError } from "../utils/errorHandler";
  import { API_ENDPOINTS } from "../config/apiConfig";

  function stopRecording() {
    disableButton(recordButtonProps)
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

  async function inferImgIsHeartsound() {
    if ($processedImgUrl === null) {
      console.error("No audio URL available");
      return;
    }
    const formData = new FormData();
    // Append the URL string directly
    formData.append("imgFileUrl", $processedImgUrl);

    try {
      const response = await fetch(API_ENDPOINTS.inferIsHeartsound, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      isHeartsound.set(data.predicted_class);
      isHeartsoundProb.set(data.predicted_prob);

      if ($isHeartsoundProb > 0.6) {
        statusText.set(
          "Preparation for heart sound analysis is complete. <br>Press the play button and check if the recording is clear before proceeding analysis."
        );
        setButtonProps(
          analyzeButtonProps,
          "custom-button",
          "Analyze ❤️ Sound",
          false
        );
      } else {
        statusText.set(
          `Heart Sound Recording Score: ${Math.floor(
            $isHeartsoundProb * 100
          )}<br>(Analysis possible only when scored over 60)<br><br>
          Your recording scored ${Math.floor(
            $isHeartsoundProb * 100
          )}. Please re-record to ensure being more audible`
        );
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // Re-throw the error to propagate it to the caller
    }
    enableButton(uploadButtonProps, "bg-blue-500 hover:bg-blue-700");
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
    try {
      // Stop the media tracks to turn off the microphone
      const stream = $mediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        mediaStream.set(null); // Clear the stream reference in the store
      }
    } catch (error) {
      console.error("Error stopping tracks:", error);
    }
    isRecording.set(false);

    $timerInterval && clearInterval($timerInterval);    
    statusText.set(
      "Converting the recording to a visible graph.<br>This may take some time."
    );
    setButtonProps(uploadButtonProps, "bg-gray-500", "Upload Audio", true);
    setButtonProps(recordButtonProps, "bg-gray-500", "Stop Recording", true);
    setButtonProps(analyzeButtonProps, "bg-gray-500", "Analyze ❤️ Sound", true);
    uploadRecording()
      .then(() => {
        isRerecording.set(true);
        showAnalyzeButton.set(true);
        setButtonProps(
          recordButtonProps,
          "bg-blue-500 hover:bg-blue-700",
          "Record Again",
          false
        );
        statusText.set(
          "Checking if the heart sounds are recorded clearly..."
        );
        sendAudioUrl().then(() => {
          inferImgIsHeartsound();
        });
      })
      .catch((error) => {
        console.error("Error during upload:", error);
        statusText.set("Upload failed.");
        setButtonProps(
          recordButtonProps,
          "bg-blue-500 hover:bg-blue-700",
          "Record Again",
          false
        );
        enableButton(uploadButtonProps, "bg-blue-500 hover:bg-blue-700");

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
        "Start Recording",
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
      ? setButtonProps(analyzeButtonProps, "bg-gray-500", "Analyze ❤️ sound", true)
      : showAnalyzeButton.set(false);

    statusText.set("Please allow microphone access for recording.");
    setButtonProps(recordButtonProps, "bg-gray-500", "Waiting", true);
    $audioChunks = [];

    try {
      const stream = await getUserMedia();
      mediaStream.set(stream); // Save the stream reference
      console.log(stream);

      $mediaRecorder
        ? $mediaRecorder.start()
        : statusText.set(
            "Sorry, unable to start recording. Try again with another device."
          );
      isHeartsoundProb.set(0);
      isRecording.set(true);
      timerDisplay.set("0:00");
      $startTime = Date.now();
      $timerInterval = setInterval(updateTimer, 1000);
      setButtonProps(
        recordButtonProps,
        "bg-red-500 hover:bg-red-700",
        "Stop Recording",
        false
      );
      statusText.set("press the blue button again<br>after recording for more than 10 seconds.");
      originalAudioUrl.set(null);
      originalImgUrl.set(null);
      processedImgUrl.set(null);
      segmentedImageUrl.set(null);
      hasMurmur.set(false);
      hasMurmurProb.set(0);
      grayColumns.set([]);
      whiteColumns.set([]);
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
  class="m-4 p-3 text-white text-base font-semibold rounded-lg 
         bg-blue-500 hover:bg-blue-700 transition-colors
         disabled:bg-gray-300 disabled:cursor-not-allowed
         w-full" 
  on:click={handleClick}
  disabled={$recordButtonProps.disabled}>

  {#if $isRecording}
     <span id="timer" class="font-normal">{$timerDisplay}</span>
  {:else}
     {$recordButtonProps.text} 
  {/if}

</button>