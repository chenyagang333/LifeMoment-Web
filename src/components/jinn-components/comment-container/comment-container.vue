<template>
  <div
    class="comment-container"
    ref="commentContainerRef"
    v-loading="!commentContentInitEnd"
    element-loading-text="努力加载中..."
    v-infinite-scroll="pagingQueryComment"
    infinite-scroll-distance="60"
    :infinite-scroll-immediate="false"
    :infinite-scroll-disabled="commentLoadEnd"
  >
    <!-- new-add-comment-area -->
    <commentReplyList
      v-if="newComments.length > 0"
      columnReverse
      :data="newComments"
      :appUserId="appUserId"
    ></commentReplyList>
    <!-- comment-area -->
    <commentReplyList
      :data="comments"
      :appUserId="appUserId"
      @reply-handle="(index:number, type:CommentType) => 
      $emit('reply-handle', index, type)"
      @delete="(commentIndex:number, type:CommentType,deleteCount:number) => 
      deleteData(commentIndex,type,deleteCount)"
      @changeStatus="( id: number, type: CommentType, active: boolean) => changeStatus(id,type,active)"
    ></commentReplyList>
    <!-- loading-animation -->
    <template v-if="commentContentInitEnd">
      <template v-if="commentLoadEnd">
        <AppEmpty
          v-if="newComments.length == 0 && comments.length == 0"
        ></AppEmpty>
        <span v-else class="comment-end">暂时没有更多评论</span>
      </template>
      <div v-else class="loadComment" v-loading="true"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  CommentItem,
  commentMap,
  CommentPropMap,
  CommentType,
} from "./components/comment-type";
import commentReplyList from "./components/comment-reply-list.vue";
import AppEmpty from "@/components-App/AppEmpty/AppEmpty.vue";

const props = withDefaults(
  defineProps<{
    appUserId: number; // 当前登录用户Id
    propMap: Partial<CommentPropMap>;
    distinct?: boolean;
    pageSize?: number;
  }>(),
  { pageSize: 10 }
);

const emit = defineEmits<{
  // 点击回复按钮回调
  (e: "reply-handle", index: number, type: CommentType): void;
  (e: "delete", id: number, type: CommentType, ok: Function): void;
  (e: "changeStatus", id: number, type: CommentType, isActive: boolean): void;
  (
    e: "loadComment",
    pageSize: number,
    pageIndex: number,
    func: (data: any[]) => void
  ): void;
  (
    e: "loadReply",
    commentId: number,
    pageSize: number,
    pageIndex: number,
    func: (data: any[]) => void
  ): void;
}>();

//#region 加载 显示数据模块

const comments = ref<Array<CommentItem>>([]); // 评论数据
const newComments = ref<Array<CommentItem>>([]); // 新增评论数据
const commentContentInitEnd = ref(false);
//#region 加载评论
const loadDataIng = ref<boolean>(false);
const commentLoadEnd = ref(false);
let commentPageIndex = 1;
// load comment data
const pagingQueryComment = () => {
  // 防止多次加载相同数据
  if (!loadDataIng.value) {
    pagingQueryComment_Begin();
    // 触发其定义事件，调用外部查询方法，查询成功，调用匿名函数，查询的数据作为参数
    emit("loadComment", props.pageSize, commentPageIndex, (data: any[]) => {
      if (data?.length > 0) {
        commentPageIndex++;
        // 做一次类型的映射
        let _data: CommentItem[] = commentMap(data, props.propMap);
        // 过滤已存在的评论
        if (props.distinct) {
          _data = pagingQueryComment_DataDistinct(_data);
        }
        comments.value.push(..._data);
      }
      pagingQueryComment_End(data?.length);
    });
  }
};
// begin action
const pagingQueryComment_Begin = () => {
  loadDataIng.value = true;
};
// end action
const pagingQueryComment_End = (dataLength: number) => {
  if (dataLength < props.pageSize) {
    commentLoadEnd.value = true;
  }
  loadDataIng.value = false;
  if (!commentContentInitEnd.value) {
    commentContentInitEnd.value = true; // 结束初始化加载动画
  }
};
// distinct
const pagingQueryComment_DataDistinct = (data: CommentItem[]) => {
  const commentIds = comments.value.map((x) => x.id);
  const newCommentIds = newComments.value.map((x) => x.id);
  const ids = [...commentIds, ...newCommentIds];
  return data.filter((x: any) => !ids.includes(x.id));
};
//#endregion
//#endregion

onMounted(() => {
  pagingQueryComment();
});

// 删除数据
const deleteData = (
  commentIndex: number,
  commentType: CommentType,
  deleCount: number
) => {
  const data = comments.value[commentIndex];
  emit("delete", data.id, commentType, () => {
    data.replyCount! -= deleCount;
  });
};

// 更新点赞状态
const changeStatus = (id:number,data: CommentItem, isActive: boolean) => {
  const updateStatus = () => {
    data.likeActive = isActive;
    data.likeCount += isActive ? 1 : -1;
  };
  const resetStatus = () => {
    data.likeActive = !isActive;
    data.likeCount += !isActive ? 1 : -1;
  };
  updateStatus(); // 更新状态
  emit("changeStatus", data.id, isActive, () => resetStatus());
};
</script>

<style scoped></style>
