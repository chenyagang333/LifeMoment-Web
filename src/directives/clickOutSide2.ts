

import {ObjectDirective } from "vue";

declare global {
  interface HTMLElement {
    __click_outside__: any;
  }
}

const vClickOutside: ObjectDirective<HTMLElement> = {
  mounted(el, binding) {
    function eventHandler(e: MouseEvent) {
      if (el.contains(e.target as Node)) {
        return false;
      }
      if (binding.value && typeof binding.value === "function") {
        binding.value(e);
      }
    }
    el.__click_outside__ = eventHandler;
    document.addEventListener("click", eventHandler);
  },
  beforeUnmount(el) {
    document.removeEventListener("click", el.__click_outside__);
    delete el.__click_outside__;
  },
};

export default vClickOutside;
