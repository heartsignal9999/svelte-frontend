<!-- src/components/Modal.svelte -->
<script lang="ts">
  import { showModal, modalTitle, modalContent } from '../stores/modalStore';

  function confirm() {
    // Confirm 버튼 클릭 시 수행할 작업
    alert("아직 준비중입니다. 스미마셍~");
    showModal.set(false);
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
