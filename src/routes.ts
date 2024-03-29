// src/routes.ts
import Home from './pages/Home.svelte';
import HeartSignal from './pages/HeartSignal.svelte';
import Blog from './pages/Blog.svelte';

// 추가적인 페이지들을 여기에 임포트하세요.

// 경로를 해당 컴포넌트에 매핑합니다.
const routes = {
  '/': Home,
  '/heartsignal': HeartSignal,
  '/blog': Blog,
  '/blog/:id': Blog, // Use dynamic segments to capture the post ID
  // 다른 경로들을 여기에 추가하세요.
};

export default routes;
