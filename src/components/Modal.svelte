<!-- src/components/Modal.svelte -->
<script lang="ts">
  import { API_ENDPOINTS } from '../config/apiConfig';
  import { showModal, modalTitle, modalContent } from '../stores/modalStore';
  import { originalAudioUrl, processedImgUrl, isProcessing } from '../stores/pageHeartSignalStore';

  async function sendAudioUrl() {
  if ($originalAudioUrl === null) {
    console.error("No audio URL available");
    return;
  }
  const formData = new FormData();
  // Append the URL string directly
  formData.append("audioFileUrl", $originalAudioUrl);

  try {
    const response = await fetch(
      API_ENDPOINTS.processAudio,
      {
        method: "POST",
        body: formData,
      }
    );

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

function confirm() {
    // Confirm 버튼 클릭 시 수행할 작업
    isProcessing.set(true);
    showModal.set(false);
    sendAudioUrl();
    isProcessing.set(false);
  }

  function cancel() {
    // Cancel 버튼 클릭 시 수행할 작업
    showModal.set(false);
  }
</script>

{#if $showModal}
  <!-- 모달 구조 -->
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
    <!-- Modal Content -->
    <div class="bg-white p-5 rounded-lg shadow-lg z-50">
      <div class="text-xl mb-4">{$modalTitle}</div>
      <div class="mb-4">{@html $modalContent}</div>
      <div class="flex">
        <button
          class="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition-colors mr-1"
          on:click={confirm}>예</button>
        <button
          class="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition-colors ml-1"
          on:click={cancel}>아니오</button>
      </div>
    </div>
  </div>
{/if}
