<!-- src/components/blog/BlogContent.svelte -->
<script>
  import { onMount } from "svelte";
  import { currentPost } from "../../stores/blogStores";

  // Use Svelte's auto-subscription syntax ($:)
  $: postContent = $currentPost;
  onMount(() => {
    if (postContent && postContent.title) {
      // 1. 타이틀이 있는지 확인
      document.title = postContent.title; // 2. 타이틀 설정
    }
  });
</script>

<div class="container mx-auto p-4">
  {#if postContent}
    <section class="bg-white shadow-md p-8 rounded-lg text-gray-700">
      <h1 class="font-bold text-3xl mb-6">{postContent.title}</h1>
      <div class="leading-7 whitespace-pre-line">
        {@html postContent.content}
      </div>
    </section>
  {:else}
    <p class="text-center mt-8">콘텐츠를 불러오는 중입니다...</p>
  {/if}
</div>
