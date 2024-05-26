<template>
  <!-- 用户的头像 -->
  <div class="headerImg">
    <el-avatar :size="40" :src="userAvatar"></el-avatar>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  userAvatar: string; // 头像图片
}>();

</script>

<style scoped></style>
