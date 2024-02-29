// src/stores/blogStores.ts
import { writable } from 'svelte/store';
import * as firstPost from '../pages/blog-contents/1';

export const currentPost = writable({ title: firstPost.title, content: firstPost.content });
