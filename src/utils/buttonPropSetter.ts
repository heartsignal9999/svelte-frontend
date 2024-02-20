// src/utils/buttonPropSetter.ts
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ButtonProps } from '../stores/pageHeartSignalStore';

export function setButtonProps(
    props: Writable<ButtonProps>,
    classes: string,
    text: string,
    disabled: boolean,
  ) {
    props.set({ classes, text, disabled });
  }

  export function disableButton(props: Writable<ButtonProps>) {
    props.set({
      ...get(props),
      classes: 'bg-gray-500',
      disabled: true
    });
  }
  
  export function enableButton(props: Writable<ButtonProps>, classes: string) {
    props.set({
      ...get(props),
      classes,
      disabled: false
    });
  }
  