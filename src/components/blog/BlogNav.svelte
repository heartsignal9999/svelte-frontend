<!-- src/components/blog/BlogNav.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { push, location } from "svelte-spa-router";
    import { blogList } from '../../stores/blogList';
    import { loadPost } from '../../utils/contentLoader';
    import { slide } from 'svelte/transition';
    
    let showList = false;
  const dispatch = createEventDispatcher();

  function navigateToServiceHome() {
    push('/heartsignal');
  }

  function navigateToBlog() {
    push('/blog');
  }

  function toggleList() {
    showList = !showList;
  }

  function toggleModal() {
    dispatch('togglemodal');
  }

  $: {
    const pathArray = $location.split('/');
    const isBlogRoute = pathArray[1] === 'blog';
    const postId = pathArray[2];
    if (isBlogRoute && postId) {
      loadPost(postId);
    }
  }
  </script>
  
  <main class="relative">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <button class="font-bold" on:click={navigateToBlog}>Heartsignal Blog</button>
      <div>
        <button class="font-bold" on:click={navigateToServiceHome}>Service |</button>
        <button class="font-bold" on:click={toggleList}>Contents List |</button>
        <button class="font-bold" on:click={toggleModal}>Team</button>
      </div>
      {#if showList}
        <div class="absolute top-full mt-2 w-56 bg-white shadow-md rounded p-4 right-0" in:slide={{ duration: 300 }}>
          <ul class="space-y-2">
            {#each blogList as post}
              <li>
                <button class="text-left w-full text-black" on:click={() => loadPost(post.file)}>{post.title}</button>
              </li>
            {/each}
          </ul>
        </div>  
      {/if}
    </nav>

  </main>
  