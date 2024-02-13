<!-- src/Pages/StatusText.svelte -->
<script lang="ts">
  import { statusText } from "../stores/pageHeartSignalStore";
</script>

<div id="status" class="text-lg mb-3 text-center">
  {@html $statusText}
</div>