<!-- 有评论则展示 -->
<template>
  <div class="comment-item-reply">
    <!-- 评论回复区域 -->
    <template v-if="replyOpen">
      <slot></slot>
    </template>
    <!-- 加载更多 | 收起回复按钮 -->
    <div v-show="!replyLoading">
      <span class="reply-header"> —— &nbsp; </span>
      <!-- 加载更多回复按钮 -->
      <span class="reply-header">
        <span class="reply-header-span" @click="loadReply()">
          <!-- 展开回复按钮 -->
          <template v-if="!replyOpen"> 展开{{ replyCount }}条回复 </template>
          <!-- 加载更多回复按钮 -->
          <template v-if="showLoadMoreBtn"> 展开更多 </template>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>
      </span>
      <!-- 收起回复按钮 -->
      <span class="reply-header" v-if="replyOpen">
        <span class="reply-header-span" @click="closeReply">
          收起
          <el-icon>
            <ArrowUp />
          </el-icon>
        </span>
      </span>
    </div>
    <!-- 加载动画效果 -->
    <div class="load-spins" v-if="replyLoading" v-loading="true"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import commentItem from "./comment-item.vue";
import { get } from "@/api/AHttp/api";
import type { CommentItem } from "../comment-type.ts";

const props = withDefaults(
  defineProps<{
    showLoadMoreBtn: boolean;
    LoadOnOpen: boolean; // 否打开是否加载数据
    replyCount?: number; // 回复数量
  }>(),
  {
    replyCount: 0,
  }
);

const emit = defineEmits<{
  (e: "loadReply", loaded: any): void; // 加载回复
}>();

const replyOpen = ref(true); // 初始状态没有展开回复

// 打开评论的回复
const openReply = () => {
  replyOpen.value = true; // 展开评论的回复
  if (props.LoadOnOpen) {
    loadReply();
  }
};

// 收起评论的回复
const closeReply = async () => {
  replyOpen.value = false; // 收起展开评论的回复
};

const replyLoading = ref(false);
// 加载评论的回复
const loadReply = async () => {
  replyLoading.value = true; // 正在加载评论
  emit("loadReply", () => {
    replyLoading.value = false; // 评论加载完成
  });
};

defineExpose({ openReply });
</script>

<style lang="scss" scoped>
.comment-item-reply {
  .load-spins {
    width: 100%;
    height: 45px;
  }
  .reply-header {
    cursor: default;
    color: #909399;
    .reply-header-span {
      $height: 20px;
      height: $height;
      line-height: $height;
      cursor: pointer;
      &:hover {
        color: #1f1f1f;
      }
    }
  }
}
</style>
