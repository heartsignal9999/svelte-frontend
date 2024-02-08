<!-- src/Pages/Modal.svelte -->
<script>
    export let show = false;
    export let title = '';
    export let content = '';
    export let onConfirm = () => {};
    export let onCancel = () => {};
  
    function confirm() {
      onConfirm();
      show = false;
    }
  
    function cancel() {
      onCancel();
      show = false;
    }
  </script>
  
  {#if show}
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div class="bg-white p-5 rounded-lg shadow-lg z-50">
      <div class="text-xl mb-4">{title}</div>
      <div class="mb-4"> {@html content}</div>
      <div class="flex">
        <button class="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition-colors mr-1" on:click={confirm}>예</button>
        <button class="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition-colors ml-1" on:click={cancel}>아니오</button>
      </div>
    </div>
  </div>
{/if}
  
  <style>

  </style>
  