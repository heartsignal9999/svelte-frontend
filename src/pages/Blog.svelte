<!-- src/Pages/Blog.svelte -->
<script lang="ts">
  import { push, location } from "svelte-spa-router";
  import { blogList } from '../stores/blogList';
  import { loadPost } from '../utils/contentLoader';
  import TableOfContents from '../components/blog/TableOfContents.svelte';
  import BlogContent from '../components/blog/BlogContent.svelte';
  import BottomNav from '../components/blog/BottomNav.svelte';

  // Navigation function
  function navigateToHome() {
    push('/heartsignal');
  }

  // Load post based on URL change
  $: {
    const pathArray = $location.split('/');
    const isBlogRoute = pathArray[1] === 'blog';
    const postId = pathArray[2];
    if (isBlogRoute && postId) {
      loadPost(postId);
    }
  }
</script>

<main class="bg-gradient-to-br from-pink-400 to-blue-500 min-h-screen text-white">
  <nav class="container mx-auto p-4 flex justify-between items-center">
    <button class="font-bold" on:click={navigateToHome}>Heartsignal</button>
    <div class="flex items-center space-x-2">
      {#each blogList as post}
        <button on:click={() => loadPost(post.file)}>{post.title}</button>
        {#if post !== blogList[blogList.length - 1]}
          <span>|</span>
        {/if}
      {/each}
    </div>    
  </nav>

  <div class="container mx-auto flex flex-col md:flex-row md:items-stretch justify-between p-4">
    <aside class="md:w-1/4 w-full mb-4 md:mb-0">
      <TableOfContents />
    </aside>
    <section class="md:w-3/4 w-full">
      <BlogContent />
    </section>
  </div>

  <footer>
    <BottomNav />
  </footer>
</main>
