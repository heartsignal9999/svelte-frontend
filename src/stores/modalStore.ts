//src/stores/modalStores.ts 
import { writable } from 'svelte/store';

export const modalTitle = writable('');
export const modalContent = writable('');
export const showModal = writable(false);
