<!-- src/App.svelte -->
<script lang="ts">
  import Router from 'svelte-spa-router';
  import routes from './routes';

  // 글로벌 스타일을 임포트합니다.
  import "./global.css";
</script>

<Router {routes} />