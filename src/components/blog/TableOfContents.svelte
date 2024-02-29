<!-- src/components/blog/TableOfContents.svelte -->
<script>
  import { slide } from 'svelte/transition';
  
  const contents = ["소개", "블로그 구조", "테크 스택", "결론"];
  let isOpen = true;

  function toggleContents() {
      isOpen = !isOpen;
  }
</script>

<aside class="mt-4 ml-4">
  <button on:click={toggleContents} class="text-white text-bold">
      {isOpen ? '▼' : '▶'} 목차
  </button>
  {#if isOpen}
      <ul class="list-disc list-inside" in:slide={{ duration: 300 }}>
          {#each contents as content}
              <li class="text-white hover:text-blue-800 cursor-pointer">{content}</li>
          {/each}
      </ul>
  {/if}
</aside>
