<!-- 有评论则展示 -->
<template>
  <div class="AppExpandReply">
    <!-- 评论回复区域 -->
    <div v-show="replyOpen">
      <slot></slot>
    </div>
    <!-- 加载更多 | 收起回复按钮 -->
    <div v-show="!replyLoading">
      <span class="reply-header"> —— &nbsp; </span>
      <!-- 加载更多回复按钮 -->
      <span class="reply-header">
        <span class="reply-header-span" @click="handler()">
          <!-- 展开回复按钮 -->
          <template v-if="!replyOpen">
            展开{{ replyCount }}条回复
            <el-icon>
              <ArrowDown /> </el-icon
          ></template>
          <!-- 加载更多回复按钮 -->
          <template v-if="replyOpen && showLoadMoreBtn">
            展开更多
            <el-icon>
              <ArrowDown /> </el-icon
          ></template>
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
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    showLoadMoreBtn: boolean;
    replyOpen?: boolean; //
    replyCount?: number; // 回复数量
  }>(),
  {
    replyOpen: false,
    replyCount: 0,
  }
);

const emit = defineEmits<{
  (e: "openReply", loadReply: Function): void; // 打开回复
  (e: "loadReply", loaded: any): void; // 加载回复
  (e: "closeReply"): void; // 加载回复
}>();

const handler = () => {
  if (props.replyOpen) {
    loadReply();
  } else {
    openReply();
  }
};

// 打开评论的回复
const openReply = () => {
  emit("openReply", () => {
    loadReply();
  });
};

// 收起评论的回复
const closeReply = async () => {
  emit("closeReply");
};

const replyLoading = ref(false);
// 加载评论的回复
const loadReply = async () => {
  replyLoading.value = true; // 正在加载评论
  emit("loadReply", () => {
    replyLoading.value = false; // 评论加载完成
  });
};
</script>

<style lang="scss" scoped>
.AppExpandReply {
  .load-spins {
    width: 100%;
    height: 45px;
    // --el-mask-color: rgba(0,0,0,0);
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
