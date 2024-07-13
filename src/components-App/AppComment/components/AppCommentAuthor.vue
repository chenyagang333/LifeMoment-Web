<template>
    <!-- 用户名 -->
    <div class="item-top">
      {{ userName }}
      <template class="userName" v-if="toUserName">
        <el-icon size="15" style="margin: 0 3px">
          <CaretRight />
        </el-icon>
        {{ toUserName }}
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    userName: string; // 用户名
    toUserName?: string; // 回复用户的用户名
  }>();
  </script>
  
  <style lang="scss" scoped>
  .item-top {
    color: $base-orange;
    display: flex;
    align-items: center;
  }
  </style>
  