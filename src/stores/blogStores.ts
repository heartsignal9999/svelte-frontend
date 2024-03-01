// src/stores/blogStores.ts
import { writable } from 'svelte/store';

export interface BlogPost {
  file?: string;
  title: string;
  content: string;
}

export const currentPost = writable<BlogPost>({ title: '', content: '' });
export const currentPostId = writable<string>('');

// Store for Table of Contents
export const tableOfContents = writable<string[]>([]);
