// // src/utils/buttonPropSetter.ts
import type { Writable } from 'svelte/store';
import { ButtonProps } from '../stores/pageHeartSignalStore';

export function setButtonProps(
    props: Writable<ButtonProps>,
    classes: string,
    text: string,
    disabled: boolean,
  ) {
    props.set({ classes, text, disabled });
  }