<template>
  <div class="JinnButton" :class="jinnClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// type: default\lucency
const { type } = defineProps<{
  type?: string;
}>();

const jinnClass = ref<string>("default");

if (type) {
  jinnClass.value = type;
}
</script>

<style scoped lang="scss">
.JinnButton {
  width: 100%;
  min-height: 39px;
  cursor: pointer;
  color: var(--jinn-text-c1);
  border-radius: var(--jinn-border-radius);
  font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  padding: 0 10px;

}
.default {
  background-color: var(--jinn-bg3);
  &:hover {
    background-color: var(--jinn-bg5);
  }
}

.lucency {
  &:hover {
    background-color: var(--jinn-bg5);
  }
}
</style>
