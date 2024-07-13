<template>
  <div class="item-main">
    <!-- 评论内容 -->
    <componentsContent :content="content"></componentsContent>
    <!-- 文件 -->
    <files></files>
  </div>
</template>

<script setup lang="ts">
import componentsContent from "./components/content.vue";
import files from "./components/files.vue";

const props = defineProps<{
  content: string; // 评论内容
}>();
</script>

<style lang="scss" scoped>
.item-main {
}
</style>
