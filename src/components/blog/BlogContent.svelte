<!-- src/components/blog/BlogContent.svelte -->
<script>
  import { currentPost } from '../../stores/blogStores';

  // Use Svelte's auto-subscription syntax ($:)
  $: postContent = $currentPost;
</script>

<div class="container mx-auto p-4">
  {#if postContent}
    <section class="bg-white shadow-md p-8 rounded-lg text-gray-700">
      <h1 class="font-bold text-3xl mb-6">{postContent.title}</h1>
      <div class="leading-7">
        {@html postContent.content}
      </div>
    </section>
  {:else}
    <p class="text-center mt-8">콘텐츠를 불러오는 중입니다...</p>
  {/if}
</div>