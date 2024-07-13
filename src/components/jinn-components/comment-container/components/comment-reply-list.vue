<template>
  <div class="comment-reply-list" :class="columnReverse ? 'columnReverse' : ''">
    <!-- 评论 -->
    <commentItem
      v-for="(c, ci) in data"
      :key="c.id"
      :showDelete="appUserId === c.userId"
      :userAvatarURL="c.userAvatarURL"
      :userName="c.userName"
      :createTime="c.createTime"
      :publishAddress="c.publishAddress"
      :content="c.content"
      :likeCount="c.likeCount"
      :likeActive="c.likeActive"
      :replyCount="c.replyCount"
      @reply-handle="$emit('reply-handle', ci, CommentType.Comment)"
      @delete="
        $emit('delete', ci, CommentType.Comment, 1 + (c.replyCount ?? 0))
      "
      @changeStatus="(active:boolean) =>
       $emit('changeStatus', c.id, CommentType.Comment,active)"
    >
      <commentReply
        v-if="c.replyList && c.replyList.length > 0"
        :showLoadMoreBtn="c.replyList?.length < (c.replyCount ?? 0)"
        :LoadOnOpen="c.replyList?.length > 0"
        :replyCount="c.replyCount"
      >
        <!-- 评论回复 -->
        <commentItem
          v-for="(r, ri) in c.replyList"
          :key="r.id"
          :showDelete="appUserId === r.userId"
          :userAvatarURL="r.userAvatarURL"
          :userName="r.userName"
          :createTime="r.createTime"
          :publishAddress="r.publishAddress"
          :content="r.content"
          :likeCount="r.likeCount"
          :likeActive="r.likeActive"
          :replyCount="r.replyCount"
          @reply-handle="$emit('reply-handle', ri, CommentType.Reply)"
          @delete="$emit('delete', ci, CommentType.Reply, 1)"
          @changeStatus="(active:boolean) =>
       $emit('changeStatus', r.id, CommentType.Reply,active)"
        >
        </commentItem>
      </commentReply>
    </commentItem>
  </div>
</template>

<script setup lang="ts">
import commentItem from "./comment-item/comment-item.vue";
import { CommentItem, CommentType } from "./comment-type";
import commentReply from "./comment-item/comment-item-reply.vue";

const props = defineProps<{
  data: Array<CommentItem>;
  columnReverse?: boolean;
  appUserId: number; // 当前登录用户Id
}>();

const emit = defineEmits<{
  // 点击回复按钮回调
  (e: "reply-handle", index: number, type: CommentType): void;
  (
    e: "delete",
    commentIndex: number,
    type: CommentType,
    deleteCount: number
  ): void;
  (e: "changeStatus", id: number, type: CommentType, isActive: boolean): void;
}>();
</script>

<style scoped>
.comment-reply-list {
  display: flex;
  flex-direction: column;
}
.columnReverse {
  flex-direction: column-reverse;
}
</style>
