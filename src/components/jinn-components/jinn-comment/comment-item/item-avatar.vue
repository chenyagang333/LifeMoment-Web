<template>
  <!-- 用户的头像 -->
  <div class="headerImg">
    <el-avatar :size="size" :src="userAvatar"></el-avatar>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  userAvatar: string; // 头像图片
  size?: number; // 头像图片
}>(),{
  size:40
});
</script>

<style scoped>
.el-avatar {
  border: 0 solid var(--el-border-color);
}
</style>
