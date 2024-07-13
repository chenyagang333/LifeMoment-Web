<template>
  <div class="comment-item">
    <!-- 用户头像 -->
    <item-avatar
      :userAvatar="FileIP + userAvatarURL"
      :size="avatarSize"
    ></item-avatar>
    <div class="core">
      <!-- 评论内容区 -->
      <div
        class="core-content"
        @mouseenter="showMoreOptions = true"
        @mouseleave="showMoreOptions = false"
      >
        <more-option
          v-if="showMoreOptions"
          :showDelete="showDelete"
          @delete-comment="$emit('delete')"
        ></more-option>
        <item-top :userName="userName" :toUserName="toUserName"> </item-top>
        <item-main :content="content"> </item-main>
        <item-footer
          :publishTime="createTime"
          :publishAddress="publishAddress"
          :likeCount="likeCount"
          :likeActive="likeActive"
          @reply-handle="() => $emit('reply-handle')"
          @changeStatus="(active:boolean) => $emit('changeStatus',active)"
        >
        </item-footer>
      </div>
      <!-- 评论回复区 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import moreOption from "./components/more-option.vue";
import { getCurrentInstance, ref } from "vue";
import itemAvatar from "./components/item-avatar.vue";
import itemTop from "./components/item-top.vue";
import itemMain from "./components/item-main/item-main.vue";
import itemFooter from "./components/item-footer.vue";
import { get } from "@/api/AHttp/api";
import { CommentItem } from "../comment-type";

const app = getCurrentInstance();
const FileIP = app?.appContext.config.globalProperties.$FileIP;

const props = withDefaults(
  defineProps<{
    // config
    avatarSize?: number;
    showDelete?: boolean;
    // data
    userAvatarURL: string;
    userName: string;
    createTime: string;
    publishAddress: string;
    content: string;
    likeCount: number;
    likeActive: boolean;
    toUserName?: string;
    replyCount?: number;
  }>(),
  {}
);

const emit = defineEmits<{
  // 点击回复按钮回调
  (e: "reply-handle"): void;
  (e: "delete"): void;
  (e: "changeStatus", isActive: boolean): void;
}>();

const showMoreOptions = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.comment-item {
  padding: 5px 0;
  display: flex;
  // justify-content: space-between;
  position: relative;
}
</style>
