<template>
  <div class="item-footer">
    <!-- 该评论-位置信息和发布时间 -->
    <div class="anputInfo">
      {{ publishTime.substring(0, publishTime.length - 3) }}
      <span v-if="publishAddress"> · {{ publishAddress }}</span>
    </div>
    <!-- 该评论-点赞评论按钮 -->
    <div class="options">
      <comment-option2
        type="chat"
        :size="15"
        text="回复"
        @click="$emit('reply-handle')"
      ></comment-option2>
      <comment-option
        :count="likeCount"
        :active="likeActive"
        bottom="3px"
        @change-status="(isActive:boolean) =>$emit('changeStatus',isActive)"
        type="heart"
        :size="15"
      ></comment-option>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentOption from "@/components/comment-option/category1.vue";
import CommentOption2 from "@/components/comment-option/category2.vue";

const props = defineProps<{
  publishTime: string; // 发布时间
  publishAddress: string; // 发布地址
  likeCount: number; // 点赞数
  likeActive: boolean; // 点赞激活
}>();
const emit = defineEmits<{
  // 点击回复按钮回调
  (e: "reply-handle"): void;
  (e: "changeStatus", isActive: boolean): void;
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
