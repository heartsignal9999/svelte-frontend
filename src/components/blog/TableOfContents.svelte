<!-- src/pages/blog-contents/TableOfContents.svelte -->
<script>
    // 예시를 위한 목차 배열
    const contents = ["소개", "블로그 구조", "테크 스택", "결론"];
  </script>
  
  <aside class="border-r border-gray-200 p-4 bg-white rounded-lg shadow-md">
    <h2 class="font-semibold text-lg mb-4 text-black">목차</h2>
    <ul class="list-disc list-inside">
      {#each contents as content}
        <li class="text-blue-600 hover:text-blue-800 cursor-pointer">{content}</li>
      {/each}
    </ul>
  </aside>
  