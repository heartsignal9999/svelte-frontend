<!-- src/components/Modal.svelte -->
<script lang="ts">
  import { API_ENDPOINTS } from "../config/apiConfig";
  import { showModal, modalTitle, modalContent } from "../stores/modalStore";
  import {
    processedImgUrl,
    recordButtonProps,
    analyzeButtonProps,
    segmentedImageUrl,
    whiteColumns,
    grayColumns,
    statusText,
    isProcessing,
    hasMurmur,
    hasMurmurProb,
  } from "../stores/pageHeartSignalStore";
  import { disableButton, setButtonProps } from "../utils/buttonPropSetter";

  async function inferImg() {
    if ($processedImgUrl === null) {
      console.error("No audio URL available");
      return;
    }
    isProcessing.set(true);
    statusText.set(
      "Analysis is currently in progress. <br>This may take some time..."
    );
    const formData = new FormData();
    // Append the URL string directly
    formData.append("imgFileUrl", $processedImgUrl);

    try {
      const response_segment = await fetch(API_ENDPOINTS.inferSegment, {
        method: "POST",
        body: formData,
      });

      if (!response_segment.ok) throw new Error("Network response was not ok");

      const data_segment = await response_segment.json();
      segmentedImageUrl.set(data_segment.segmentedImageUrl);
      whiteColumns.set(data_segment.white_columns);
      grayColumns.set(data_segment.gray_columns);
      statusText.set("Analysis has been complete.<br>Note that the results may not be accurate. <br>Please visit a nearby cardiology clinics for accurate diagnosis.");
      isProcessing.set(false);
      setButtonProps(
        recordButtonProps,
        "bg-blue-500 hover:bg-blue-700",
        "Record Again",
        false
      );
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      isProcessing.set(false);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  async function inferHasMurmur() {
    if ($processedImgUrl === null) {
      console.error("No image URL available");
      return;
    }
    const formData = new FormData();
    formData.append("imgFileUrl", $processedImgUrl);

    try {
      const response = await fetch(API_ENDPOINTS.inferHasMurmur, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      hasMurmur.set(data.predicted_class);
      hasMurmurProb.set(data.predicted_prob);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  async function confirm() {
    // Confirm 버튼 클릭 시 수행할 작업
    showModal.set(false);
    disableButton(recordButtonProps);
    disableButton(analyzeButtonProps);

    try {
      await inferImg();
      await inferHasMurmur();

      // 비동기 작업 완료 후 버튼 상태 업데이트
      setButtonProps(
        recordButtonProps,
        "bg-blue-500 hover:bg-blue-700",
        "Record Again",
        false
      );
    } catch (error) {
      console.error("Error during image inference:", error);
      // 에러 발생 시 필요한 처리
      // 예: 사용자에게 오류 메시지를 보여주는 등
    }
  }

  function cancel() {
    // Cancel 버튼 클릭 시 수행할 작업
    showModal.set(false);
  }
</script>


{#if $showModal}
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4"> 
      <div class="text-2xl font-semibold mb-4">{$modalTitle}</div> 
      <div class="mb-6">{@html $modalContent}</div> 

      <div class="flex">
        <button class="w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded mr-2" 
                on:click={cancel}>Cancel</button>
        <button class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" 
                on:click={confirm}>Confirm</button>
      </div>
    </div> 
  </div>
{/if}