<template>
  <div class="AppComment">
    <!-- 发布完成提示消息 -->
    <my-message v-model="ShowPublishResultMessage" text="已发布"></my-message>
    <div class="comment-num" style="height: 22px;line-height: 22px;">全部评论({{ commentCount }})</div>
    <JinnComment
      :style="{ height: `calc(100% - ${isReply ? '154px' : '124px'})` }"
      ref="JinnCommentRef"
      :showId="showId"
      v-model:is-reply="isReply"
      @del="(id: number, CommentType: CommentType, delCount: number) => delComment(id,CommentType,delCount)"
      @replyHandle="(userName: string) => replyHandle(userName)"
      @loadComment="(pageSize: number, pageIndex: number,func: CallBack) => loadComment(pageSize,pageIndex,func)"
      @loadReply="(commentId:number,pageSize: number, pageIndex: number,func: CallBack) => loadReply(commentId,pageSize,pageIndex,func)"
      @changeStatus="(id:number,isActive:boolean,commentType:CommentType) => changeStatus(id,isActive,commentType)"
    >
    </JinnComment>
    <!-- 发表评论 -->
    <comment-add
      style="
        position: absolute;
        bottom: 0;
        width: calc(100% - 32px);
        min-width: 310px;
      "
      minHeight="60px"
      ref="commentAddRef"
      v-model="isReply"
      @push-handle="(html: string) => pushHandle(html)"
      :toUserName="_toUserName"
    ></comment-add>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import CommentAdd from "@/components/comment-add/CommentAdd.vue";
import myMessage from "@/components/message/my-message.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { get, del, post } from "@/api/AHttp/api";
import { ElMessage } from "element-plus";
import { ApiResult } from "@/api/AHttp/api";
import JinnComment from "@/components/jinn-components/jinn-comment/jinn-comment.vue";
import type {
  CallBack,
  CommentItem,
} from "@/components/jinn-components/jinn-comment/comment-type.ts";
import { CommentType } from "@/components/jinn-components/jinn-comment/comment-type.ts";

const JinnCommentRef = ref<InstanceType<typeof JinnComment> | null>(null);
const commentAddRef = ref<InstanceType<typeof CommentAdd> | null>(null);
const pushHandle = async (html: string) => {
  JinnCommentRef.value?.pushHandle(html, async (data: CommentItem) => {
    let res: ApiResult<number>;
    if (isReply.value) res = await post("Reply/CreateReply", data);
    else res = await post("Comment/CreateComment", data);
    if (res.code === 200) {
      commentCount.value++
      return {
        ok: true,
        data: res.data, // 新增数据Id
        msg: "发布成功",
      };
    }
    return { ok: false, data: res.data, msg: "发布失败" };
  });
};

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = defineProps<{
  showId: number;
}>();

const commentCount = defineModel<number>("commentCount", {
  required: true,
  default: 0,
});

//#region 评论数据初始化

//#endregion

//#region 加载评论

const ShowPublishResultMessage = ref(false);

const isReply = ref(false);
const _toUserName = ref("");
//#endregion

const replyHandle = (userName: string) => {
  isReply.value = true;
  _toUserName.value = userName;
  commentAddRef.value?.focusTextArea(); // 激活窗口，刷新窗口的状态
};

const loadComment = async (
  pageSize: number,
  pageIndex: number,
  func: (data: CommentItem[]) => void
) => {
  const res = await get("Comment/PagingQueryByShowId", {
    showId: props.showId,
    pageSize,
    pageIndex,
  });
  if (res.code === 200) return func(res.data);
  return null;
};
const loadReply = async (
  commentId: number,
  pageSize: number,
  pageIndex: number,
  func: (data: CommentItem[]) => void
) => {
  const res = await get("Reply/PagingQueryByCommentId", {
    commentId,
    pageSize,
    pageIndex,
  });
  if (res.code === 200) return func(res.data);
  return null;
};

const delComment = async (
  id: number,
  commentType: CommentType,
  delCount: number
) => {
  console.log('delCount :>> ', delCount);
  let res;
  if (commentType === CommentType.Comment) {
    res = await del("Comment/DeleteById", { id });
  } else if (commentType === CommentType.Reply) {
    res = await del("Reply/DeleteById", { id });
  }
  if (res.code === 200) {
    ElMessage.success("删除成功");
    commentCount.value -= delCount;
  } else {
    ElMessage.error("删除失败");
  }
};

const changeStatus = async (
  id:number,
  isActive: boolean,
  commentType: CommentType,
  func: Function
) => {
  const updateType = isActive ? 1 : 0;
  const url = commentType === CommentType.Comment
    ? "Comment/UpdateLikeComment"
    : "Reply/UpdateLikeReply";
    console.log('object :>> ', url,updateType,id);
  const res = await get(url, { id, updateType });
  if (res.code == 200) {
  } else {
    func();
  }
};
</script>

<style scoped lang="scss">
.AppComment {
  position: relative;
  height: 100%;
}
</style>
