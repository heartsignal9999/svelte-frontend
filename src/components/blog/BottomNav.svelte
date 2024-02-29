<!-- src/components/blog/BottomNav.svelte -->
<script lang='ts'>
    import { blogList } from '../../stores/blogList';
    import { currentPostId } from '../../stores/blogStores';
    import { push } from "svelte-spa-router";

    $: currentId = $currentPostId;
    $: currentIndex = blogList.findIndex(post => post.file === currentId);

    $: prevPost = currentIndex > 0 ? blogList[currentIndex - 1] : null;
    $: nextPost = currentIndex < blogList.length - 1 && currentIndex !== -1 ? blogList[currentIndex + 1] : null;

    function navigateTo(file: string | undefined) {
        if (file) {
            push(`/blog/${file}`);
            currentPostId.set(file); // Update currentPostId when navigating
        }
    }
</script>

<main></main>
<footer>

    {#if prevPost}
      <button on:click={() => navigateTo(prevPost.file)}>Prev: {prevPost.title}</button>
    {/if}
    {#if nextPost}
      <button on:click={() => navigateTo(nextPost.file)}>Next: {nextPost.title}</button>
    {/if}
</footer>
