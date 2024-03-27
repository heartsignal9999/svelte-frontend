// src/utils/contentLoader.ts
import { currentPost, currentPostId, tableOfContents, titleOfContent } from '../stores/blogStores';
import { push } from "svelte-spa-router";

export function loadPost(filename: string) {
  import(`../pages/blog-contents/${filename}.ts`).then(post => {
    currentPost.set({ file: filename, title: post.title, content: post.content });
    currentPostId.set(filename);
    const tocItems = extractTitlesFromContent(post.content);
    tableOfContents.set(tocItems);
    titleOfContent.set([post.title]); // 타이틀도 함께 설정합니다.
    document.title = post.title; // 페이지 제목을 업데이트합니다.
    updateMetaTags(post.title, post.description); // 메타 태그를 업데이트합니다.
    push(`/blog/${filename}`);
  });
}

export function extractTitlesFromContent(content) {
  const h2ContentRegex = /<h2.*?>(.*?)<\/h2>/g;
  return [...content.matchAll(h2ContentRegex)].map(match => match[1]);
}

// 메타 태그를 업데이트하는 함수를 추가합니다.
function updateMetaTags(title: string, description: string) {
  const ogTitleTag = document.querySelector('meta[property="og:title"]');
  const ogDescriptionTag = document.querySelector('meta[property="og:description"]');

  if (ogTitleTag) {
    ogTitleTag.setAttribute('content', title);
  }

  if (ogDescriptionTag) {
    ogDescriptionTag.setAttribute('content', description);
  }
}