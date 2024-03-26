// src/stores/blogStores.ts
import { writable } from 'svelte/store';
import { extractTitlesFromContent } from '../utils/contentLoader';

export interface BlogPost {
  file?: string;
  title: string;
  content: string;
}

export const currentPost = writable<BlogPost>({ title: '', content: '' });
export const currentPostId = writable<string>('');
export const teamInfoModal = writable<boolean>(false);
export const ListModal = writable<boolean>(false);


// Initialize the store with the contents of '1.ts'
let initialTocItems = [];
let initialTitleItems = [];

import('../pages/blog-contents/1.ts').then(post => {
  initialTocItems = extractTitlesFromContent(post.content);
  tableOfContents.set(initialTocItems);
  initialTitleItems = extractTitlesFromContent(post.title);
  titleOfContent.set(initialTitleItems);
  currentPost.set({ file: '1', title: post.title, content: post.content });
  currentPostId.set('1');
});

export const tableOfContents = writable<string[]>(initialTocItems);
export const titleOfContent = writable<string[]>(initialTitleItems);

