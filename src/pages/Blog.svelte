<!-- src/Pages/Blog.svelte -->
<script lang="ts">
  import { location } from "svelte-spa-router";
  import { loadPost } from "../utils/contentLoader";
  import TableOfContents from "../components/blog/TableOfContents.svelte";
  import BlogContent from "../components/blog/BlogContent.svelte";
  import BottomNav from "../components/blog/BottomNav.svelte";
  import BlogNav from "../components/blog/BlogNav.svelte";
  import TeamInfoModal from "../components/blog/TeamInfoModal.svelte";
  import { onMount } from "svelte";

  // Load post based on URL change
  $: {
    const pathArray = $location.split("/");
    const isBlogRoute = pathArray[1] === "blog";
    const postId = pathArray[2];
    if (isBlogRoute && postId) {
      loadPost(postId);
    }
  }
</script>

<main
  class="bg-gradient-to-br from-pink-400 to-blue-500 min-h-screen text-white"
>
  <BlogNav />
  <TeamInfoModal />

  <div
    class="container mx-auto flex flex-col md:flex-row md:items-stretch justify-between p-4"
  >
    <aside class="md:w-1/3 w-full mb-4 md:mb-0">
      <TableOfContents />
    </aside>
    <section class="md:w-2/3 w-full">
      <BlogContent />
    </section>
  </div>

  <footer>
    <BottomNav />
  </footer>
</main>
