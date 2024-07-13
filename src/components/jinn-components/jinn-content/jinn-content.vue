<template>
  <div class="jinn-content" v-html="content"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();
</script>

<style scoped>
.jinn-content {
  line-height: 1.5;
  font-size: 15px;
  width: 100%;
  color: var(--jinn-text-color1);
  word-break: break-all;
}
</style>
