// src/stores/blogStores.ts
import { writable } from 'svelte/store';
import * as firstPost from '../pages/blog-contents/1';

export interface BlogPost {
  file?: string;
  title: string;
  content: string;
}

// Store for the current post
export const currentPost = writable<BlogPost>({ 
  title: firstPost.title, 
  content: firstPost.content 
});

// Store for the current post ID
export const currentPostId = writable<string>('1'); // Default to '1'
