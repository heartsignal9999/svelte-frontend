// src/main.ts

import App from './App.svelte';
import { currentPost } from './stores/blogStores';
import { onMount } from 'svelte';

const app = new App({
  target: document.getElementById('app'),
});

// 현재 포스트의 타이틀을 구독하여 페이지의 타이틀과 메타데이터를 설정
currentPost.subscribe(post => {
  // 현재 URL에 "blog"이 포함되어 있는지 확인
  const isBlogRoute = window.location.href.includes("#/blog");
  
  // "blog"이 포함되어 있다면 포스트의 타이틀로 페이지의 타이틀과 메타데이터를 설정
  if (isBlogRoute && post.title) {
    document.title = post.title;
    setMetaTags(post.title, 'HeartSignal - ' + post.title, 'Listen to Your Heart'); // 메타데이터 설정
  } else {
    // "blog"이 포함되어 있지 않거나 포스트의 타이틀이 없는 경우 기본 제목과 메타데이터를 사용
    document.title = 'HeartSignal - Listen to Your Heart';
    setMetaTags('HeartSignal - Listen to Your Heart', 'HeartSignal - Listen to Your Heart', 'Listen to Your Heart'); // 메타데이터 설정
  }
});

// "/" 경로에 대한 구독
onMount(() => {
  // 현재 경로가 "/heartsignal"인지 확인
  const isHeartSignalRoute = window.location.pathname === '/heartsignal';

  // "/heartsignal" 경로에 있다면 페이지 타이틀과 메타데이터를 설정
  if (isHeartSignalRoute) {
    document.title = 'HeartSignal - Listen to Your Heart';
    setMetaTags('HeartSignal - Listen to Your Heart', 'HeartSignal - Listen to Your Heart', 'Listen to Your Heart'); // 메타데이터 설정
  }
});

// 메타데이터를 설정하는 함수
function setMetaTags(title: string, ogTitle: string, ogDescription: string) {
  const ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (ogTitleTag) {
    ogTitleTag.setAttribute('content', ogTitle);
  }
  
  const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  if (ogDescriptionTag) {
    ogDescriptionTag.setAttribute('content', ogDescription);
  }

  document.title = title;
}

export default app;
