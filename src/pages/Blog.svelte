<!-- src/Pages/Blog.svelte -->
<script lang="ts">
  import { push } from "svelte-spa-router";
  import { blogList } from '../stores/blogList';
  import { currentPost } from '../stores/blogStores';
  import TableOfContents from '../components/blog/TableOfContents.svelte';
  import BlogContent from '../components/blog/BlogContent.svelte';
  import BottomNav from '../components/BottomNav.svelte';

  function navigateToHome() {
    push('/heartsignal');
  }

  function loadPost(filename: string) {
    import(`./blog-contents/${filename}.ts`).then(post => {
      currentPost.set({ title: post.title, content: post.content });
      push(`/blog/${filename}`); // Add this line to navigate to the appropriate route
    });
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

  <div class="container mx-auto flex justify-between p-4">
    <aside class="w-1/4">
      <TableOfContents />
    </aside>
    <section class="w-1/2">
      <BlogContent />
    </section>
  </div>

  <footer>
    <BottomNav />
  </footer>
</main>
