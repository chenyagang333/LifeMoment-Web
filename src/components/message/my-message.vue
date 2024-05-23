<template>
  <div class="my-message" v-if="show">
      {{ text }}
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
defineProps<{
  text: string;
  size?: string;
}>();

const show = defineModel();

watch(show, (newShow) => {
  if (newShow) {
    setTimeout(() => {
      show.value = false;
    }, 2000);
  }
});
</script>

<style lang="scss" scoped>
.my-message {
  width: 140px;
  height: 50px;
  background-color: #f0f9eb;
  color: #67c23a;
  border-radius: 10px;
  border: 1px solid #b3e19d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}
</style>
