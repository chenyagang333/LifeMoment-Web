<template>
  <div class="content" v-html="content"></div>
</template>

<script setup lang="ts">
import { replaceCustomString } from "@/utils/FileUtils/EmotionFile";

const props = defineProps<{
  content: string; // 评论内容
}>();
</script>

<style lang="scss" scoped>
.content {
  color: var(--jinn-text-color1);
  font-size: 14.5px;
  width: 100%;
  word-break: break-all;
}
</style>
