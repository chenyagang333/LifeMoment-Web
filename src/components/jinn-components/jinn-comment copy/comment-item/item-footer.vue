<template>
  <div class="item-footer">
    <!-- 该评论-位置信息和发布时间 -->
    <div class="anputInfo">{{ publishTime.substring(0,publishTime.length - 3) }} · {{ publishAddress }}</div>
    <!-- 该评论-点赞评论按钮 -->
    <div class="options">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  publishTime: string; // 发布时间
  publishAddress: string; // 发布地址
}>();


</script>

<style lang="scss" scoped>
.anputInfo {
  font-size: 13px;
  $height: 22px;
  height: $height;
  line-height: $height;
  color: #9f9f9f;
}
.options {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
</style>
