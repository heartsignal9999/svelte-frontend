// src/utils/timer.ts
import { get } from 'svelte/store';
import {
    timerDisplay,
    startTime
} from "../stores/pageHeartSignalStore";

export function updateTimer() {
    const start = get(startTime); // startTime의 현재 값을 얻음
    const elapsed = Date.now() - start;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.set(
      `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
    );
}
