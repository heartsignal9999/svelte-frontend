// src/utils/contentLoader.ts
import { currentPost, currentPostId, tableOfContents } from '../stores/blogStores';
import { push } from "svelte-spa-router";

function extractTitlesFromContent(content) {
  const h2ContentRegex = /<h2.*?>(.*?)<\/h2>/g;
  return [...content.matchAll(h2ContentRegex)].map(match => match[1]);
}

export function loadPost(filename: string) {
  import(`../pages/blog-contents/${filename}.ts`).then(post => {
    currentPost.set({ file: filename, title: post.title, content: post.content });
    currentPostId.set(filename);
    const tocItems = extractTitlesFromContent(post.content);
    tableOfContents.set(tocItems);
    push(`/blog/${filename}`);
  });
}
