<!-- src/components/blog/BottomNav.svelte -->
<script lang='ts'>
    import { blogList } from '../../stores/blogList';
    import { currentPostId } from '../../stores/blogStores';
    import { loadPost } from '../../utils/contentLoader';

    $: currentId = $currentPostId;
    $: currentIndex = blogList.findIndex(post => post.file === currentId);

    $: prevPost = currentIndex > 0 ? blogList[currentIndex - 1] : null;
    $: nextPost = currentIndex < blogList.length - 1 && currentIndex !== -1 ? blogList[currentIndex + 1] : null;
</script>

<footer class="container mx-auto px-8 flex justify-between">
  {#if prevPost}
    <button 
      on:click={() => loadPost(prevPost.file)} 
      class="text-white hover:text-blue-800 cursor-pointer font-bold py-2 px-4 rounded"
    >
    <span>&lt;&nbsp;&nbsp;</span><span class="underline">{prevPost.title}</span>
    </button>
  {:else}
    <!-- Empty div for spacing -->
    <div></div>
  {/if}

  {#if nextPost}
    <button 
      on:click={() => loadPost(nextPost.file)} 
      class="text-white hover:text-blue-800 cursor-pointer font-bold py-2 px-4 rounded"
    >
    <span class="underline">{nextPost.title}</span><span>&nbsp;&nbsp;&gt;</span>
    </button>
  {:else}
    <!-- Empty div for spacing -->
    <div></div>
  {/if}
</footer>