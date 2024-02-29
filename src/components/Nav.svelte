<!-- src/components/Nav.svelte -->
<script lang='ts'>
  import { push } from "svelte-spa-router";
  import { currentPostId } from '../stores/blogStores';

  // Blog 페이지로 이동하는 함수
  function navigateToBlog() {
    currentPostId.set('1'); // Set the current post ID to '1'
    push('/blog');
  }

  // Contact 메일 링크
  const mailtoLink = 'mailto:heartsignal9999@gmail.com';
</script>
  
<!-- src/components/Nav.svelte -->
<main>
    <nav class="flex justify-between items-center p-4 border-b border-gray-200">
      <div>
        <!-- Logo or Brand Name Here -->
        <span class="font-semibold text-lg text-gray-800">HeartSignal</span>
      </div>
      <div class="flex space-x-4">
        <button 
          class="text-gray-600 hover:text-gray-800 font-medium focus:outline-none" 
          on:click={navigateToBlog}>
          Blog
        </button>
        <a 
          href={mailtoLink} 
          class="text-gray-600 hover:text-gray-800 font-medium">
          Contact
        </a>
      </div>
    </nav>
  </main>
  