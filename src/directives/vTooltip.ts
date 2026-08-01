// src/directives/tooltip.ts
import type { Directive } from 'vue';

export const vTooltip: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    el.classList.add('has-tooltip');
    el.setAttribute('data-tooltip', binding.value);
  },
  updated(el, binding) {
    el.setAttribute('data-tooltip', binding.value);
  }
};