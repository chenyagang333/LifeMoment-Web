<template>
  <template v-if="display">
    <div class="comment-item">
      <div class="left">
        <item-avatar
          :userAvatar="FileIP + userAvatarURL"
          :size="avatarSize"
        ></item-avatar>
      </div>
      <div class="right">
        <div class="core">
          <more-option
            :user-id="userId"
            :id="id"
            :isReply="isReply"
            @delete-comment="deleteComment"
          ></more-option>
          <item-top :userName="userName" :toUserName="toUserName"> </item-top>
          <item-main :content="content"> </item-main>
          <item-footer
            :publishTime="createTime"
            :publishAddress="publishAddress"
          >
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
              :isActive="likeActive!"
              @change-status="(isActive:boolean) =>changeStatus(isActive)"
              type="heart"
              :size="15"
            ></comment-option>
          </item-footer>
        </div>
        <!-- 评论回复区 -->
        <slot></slot>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import CommentOption from "@/components/comment-option/category1.vue";
import CommentOption2 from "@/components/comment-option/category2.vue";
import moreOption from "./more-option.vue";
import { getCurrentInstance, ref } from "vue";
import itemAvatar from "./item-avatar.vue";
import itemTop from "./item-top.vue";
import itemMain from "./item-main.vue";
import itemFooter from "./item-footer.vue";
import { get } from "@/api/AHttp/api";
import { CommentItem } from "../comment-type";

const app = getCurrentInstance();
const FileIP = app?.appContext.config.globalProperties.$FileIP;

const props = withDefaults(
  defineProps<{
    isReply?: boolean;
    commentData: CommentItem;
    avatarSize?: number;
  }>(),
  {
    avatarSize: 40,
  }
);

const {
  id,
  userAvatarURL,
  userId,
  userName,
  createTime,
  publishAddress,
  content,
  showId,
  likeCount,
  likeActive,
  replyCount,
  toUserName,
  // loadedReplyCount,
} = props.commentData;

const emit = defineEmits<{
  // 点击回复按钮回调
  (e: "reply-handle"): void;
  (e: "delete-comment"): void;
  (e: "changeStatus", isActive: boolean): void;
}>();

const display = ref(true);
const deleteComment = () => {
  display.value = false;
  emit("delete-comment");
};

//#region 改变爱心状态

const changeStatus = async (isActive: boolean) => {
  emit("changeStatus", isActive);
};

//#endregion
</script>

<style lang="scss" scoped>
.comment-item {
  padding: 5px 0;
  display: flex;
  // justify-content: space-between;
  &:hover {
    > .right {
      > .core {
        > .more-option {
          display: block;
        }
      }
    }
  }
  > .right {
    width: calc(100% - 45px);
    font-size: 14px;
    margin-left: 5px;
    // $height: 19px;
    > .core {
      > .more-option {
        display: none;
      }
    }
    .core {
      position: relative;
    }
  }
}
</style>
