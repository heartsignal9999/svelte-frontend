<!-- src/components/uploadButton.svelte -->
<script lang="ts">
  import {
    isProcessing,
    isRecording,
    uploadButtonProps,
  } from "../stores/pageHeartSignalStore";
  import { API_ENDPOINTS } from "../config/apiConfig";

  let fileInput: HTMLInputElement;

  async function uploadFile(file: string | Blob) {
    const formData = new FormData();
    formData.append("file", file);
    isProcessing.set(true);
    try {
      const response = await fetch(API_ENDPOINTS.uploadAudio, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      // Handle the response data as needed
      const data = await response.json();
      console.log(data); // Do something with the response
    } catch (error) {
      console.error("Error during file upload:", error);
    }
    isProcessing.set(false);
  }

  function handleUpload() {
    fileInput.click();
  }

  function handleFileChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        uploadFile(file);
      }
    }
  }
</script>

<input
  type="file"
  bind:this={fileInput}
  on:change={handleFileChange}
  class="hidden"
/>

{#if !$isProcessing && !$isRecording }
  <button
    id="uploadButton"
    class="m-4 p-3 text-white text-base font-semibold rounded-lg
     bg-blue-500 hover:bg-blue-700 transition-colors
     disabled:bg-gray-300 disabled:cursor-not-allowed
     w-full"
    on:click={handleUpload}
    disabled={$uploadButtonProps.disabled}>
    {$uploadButtonProps.text}
  </button>
{/if}
