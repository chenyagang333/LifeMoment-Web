<template>
  <div class="my-comment">
    <div class="drawer-comment-main">
      <!-- 发布完成提示消息 -->
      <my-message v-model="ShowPublishResultMessage" text="已发布"></my-message>
      <div class="comment-num">全部评论({{ commentCount }})</div>
      <!-- 初始加载动画 -->
      <a-spin
        tip="&nbsp;&nbsp;加载中"
        dot
        :loading="commentContentInit"
        style="width: 100%"
      >
        <!-- 评论内容区域 -->
        <div
          class="comment-content"
          ref="commentContentRef"
          v-infinite-scroll="pagingQueryComment"
          infinite-scroll-distance="60"
          :infinite-scroll-immediate="false"
          :infinite-scroll-disabled="commentLoadEnd"
          :class="isReply ? 'comment-content-reply' : ''"
       
        >
          <!-- ----------------------------新增评论 评论区----------------------------- -->
          <div class="new-comment">
            <comment-item
              v-for="(c, index) in newComments"
              :key="index"
              :commentData="c"
              @reply-handle="() => replyHandle(index, true, false, c.userName)"
              @delete-comment="() => deleteComment(true, c.replyCount)"
            >
              <div class="newCommentAddReply">
                <!-- 新增评论回复区 -->
                <item-reply
                  ref="newCommentReplyRefs"
                  :comment-id="c.id"
                  v-model:replyCount="c.replyCount!"
                  @reply-handle="(userName:string) => replyHandle(index, true, true,userName)"
                  @delete-comment="() => deleteComment(false)"
                ></item-reply>
              </div>
            </comment-item>
          </div>
          <!-- ----------------------------评论区----------------------------- -->
          <comment-item
            v-for="(c, index) in comments"
            :key="index"
            :commentData="c"
            @reply-handle="() => replyHandle(index, false, false, c.userName)"
            @delete-comment="() => deleteComment(true, c.replyCount)"
          >
            <!-- 新增评论回复区 -->
            <div class="commentAddReply">
              <item-reply
                ref="commentReplyRefs"
                :comment-id="c.id"
                v-model:replyCount="c.replyCount!"
                @reply-handle="(userName:string) => replyHandle(index, false, true,userName)"
                @delete-comment="() => deleteComment(false)"
              ></item-reply>
            </div>
          </comment-item>
          <!-- 加载动画 -->
          <template v-if="!commentContentInit">
            <span class="comment-end" v-if="commentLoadEnd"
              >暂时没有更多评论</span
            >
            <a-spin v-else dot />
          </template>
        </div>
      </a-spin>
    </div>
    <!-- 发表评论 -->
    <comment-add
      style="
        position: absolute;
        bottom: 15px;
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
import { nextTick, onMounted, computed, ref, reactive } from "vue";
import CommentAdd from "@/components/comment-add/CommentAdd.vue";
import commentItem from "./comment-item/comment-item.vue";
import itemReply from "./comment-item/item-reply.vue";
import myMessage from "@/components/message/my-message.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { CommentReplyType } from "@/types/Layout1/youshow/show-card";
import { get, del, post } from "@/api/AHttp/api";
import { ElMessage, ClickOutside as vClickOutside } from "element-plus";
import { afterExecutionAsync } from "@/utils/utils";
import GetNowData from "@/utils/newDate";
import { GetAddressByYouShowAsync } from "@/api/Commen";
import { ApiResult } from "@/api/AHttp/api";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = defineProps<{
  showId: number;
}>();

const commentCount = defineModel<number>("commentCount", { required: true });

//#region 评论数据初始化

const commentContentInit = ref(true);
onMounted(async () => {
  await pagingQueryComment();
  commentContentInit.value = false; // 初始化加载动画
});

//#endregion

//#region 加载评论

const commentLoadEnd = ref(false);
const comments = ref<Array<CommentReplyType>>([]);
let commentPageIndex = 1;
const pagingQueryComment = afterExecutionAsync(async () => {
  const pageSize = 10;
  const params = {
    showId: props.showId,
    pageSize: pageSize,
    pageIndex: commentPageIndex,
  };
  const res = await get("Comment/PagingQueryByShowId", params);
  if (res.code == 200) {
    if (res.data) {
      if (res.data.length > 0) {
        commentPageIndex++;
        const commentIds = comments.value.map((x) => x.id);
        const newCommentIds = newComments.value.map((x) => x.id);
        const ids = [...commentIds, ...newCommentIds];
        const filterData = res.data.filter((x: any) => !ids.includes(x.id));
        comments.value.push(...filterData);
      }
      if (res.data.length < pageSize) {
        commentLoadEnd.value = true;
      }
    }
  }
});

//#endregion

//#region 发表评论或评论回复

const builderParams = async (content: string): Promise<any> => {
  const resAddress = await GetAddressByYouShowAsync();
  return {
    id: 0,
    userId: userData.value?.userId!,
    userAvatarURL: userData.value?.avatarImageURL!,
    userName: userData.value?.userName!,
    createTime: GetNowData(),
    publishAddress: resAddress,
    content: content,
    showId: props.showId,
    likeCount: 0,
    likeActive: false,
    toUserName: "",
    replyCount: 0,
  };
};

const newComments = ref<Array<CommentReplyType>>([]);
const addComment = async (html: string) => {
  const params = await builderParams(html);
  const res = await post("Comment/CreateComment", params);
  if (res.code == 200) {
    ShowPublishResultMessage.value = true;
    params.id = res.data;
    newComments.value.push(params);
    commentCount.value++; // 评论添加成功，更新评论数量
  } else {
    ElMessage(res.message);
  }
  return res;
};

const newCommentReplyRefs = ref<any[]>([]);
const commentReplyRefs = ref<any[]>([]);
const addReply = async (
  html: string,
  replyTemplate: any
): Promise<ApiResult<any>> => {
  const data = await builderParams(html);
  if (isReplyToReply.value) {
    data.toUserName = _toUserName.value;
  }
  const commentTemplate = getCommentTemplate();
  data.commentId = commentTemplate.id;
  const res = await post("Reply/CreateReply", data);
  if (res.code == 200) {
    // if (commentTemplate.replyCount) {
    //   commentTemplate.replyCount++;
    // }
    commentCount.value++; // 评论添加成功，更新评论数量
    data.id = res.data;
    ShowPublishResultMessage.value = true;
    // await nextTick();
    replyTemplate.pushReply(data);
    // 添加回复前，如果没有打开回复列表则打开
  } else {
    ElMessage(res.message);
  }
  return res;
};

const commentAddRef = ref(); // 评论框实例
const isNewCommentReply = ref(); // 评论框实例选定：新评论的回复
const isReplyToReply = ref(); // 评论框实例选定：回复的回复

const commentContentRef = ref();
// const commentRefs = ref<any>([]);
// const newCommentRefs = ref<any>([]);
let commentIndex = 0; // 表示该回复列表在评论列表中的索引

const pushHandle = async (html: string) => {
  commentContentRef.value.style.scrollBehavior = "smooth";
  if (isReply.value) {
    const replyTemplateRef = getReplyTemplate();
    const res = await addReply(html, replyTemplateRef);
    if (res.code == 200) {
      // 添加回复前，如果没有打开回复列表则打开(获取评论组件实例，加载评论)
      replyTemplateRef.openReplys();
      await nextTick();
      const className = isNewCommentReply.value
        ? ".newCommentAddReply"
        : ".commentAddReply";
      const replyTemplate =
        commentContentRef.value.querySelectorAll(className)[commentIndex];
      console.log("replyTemplate :>> ", replyTemplate.offsetTop);
      console.log("replyTemplate :>> ", replyTemplate.offsetHeight);
      console.log(
        "replyTemplate :>> ",
        (1 / 2) * commentContentRef.value.offsetHeight
      );
      console.log("replyTemplate4 :>> ", commentContentRef.value.clientHeight);
      const setTop =
        replyTemplate.offsetTop +
        replyTemplate.offsetHeight -
        (1 / 2) * commentContentRef.value.offsetHeight;
      commentContentRef.value.scrollTop = setTop;
    }
  } else {
    addComment(html);
    // 添加后跳到评论框的顶部
    commentContentRef.value.scrollTop = 0;
  }
};
// 工具函数：获取实例
const getReplyTemplate = () => {
  // (获取评论组件实例，新增评论)
  return isNewCommentReply.value
    ? newCommentReplyRefs.value[commentIndex]
    : commentReplyRefs.value[commentIndex];
};
const getCommentTemplate = () => {
  // (获取评论组件实例，新增评论)
  return isNewCommentReply.value
    ? newComments.value[commentIndex]
    : comments.value[commentIndex];
};

//#endregion

//#region 点击评论或回复的 回复消息图标

const isReply = ref(false);
const _toUserName = ref("");
const replyHandle = async (
  index: number,
  _isNewCommentReply: boolean,
  _isReplyToReply: boolean,
  userName: string
) => {
  isReply.value = true; // 点击该按钮代表是回复
  _toUserName.value = userName;
  commentAddRef.value?.focusTextArea(); // 激活窗口，刷新窗口的状态
  isNewCommentReply.value = _isNewCommentReply;
  isReplyToReply.value = _isReplyToReply;
  commentIndex = index; // (点击评论icon后记录 加载评论或新的评论的索引)用于添加回复后跳转到回复列表底部
  console.log("commentIndex :>> ", commentIndex);
};

//#endregion

//#region 评论回复后的提示消息

const ShowPublishResultMessage = ref(false);

//#endregion

// 成功删除评论后触发 更新评论数量
const deleteComment = (isDelComment: boolean, replyCount?: number) => {
  if (isDelComment && replyCount) {
    commentCount.value -= 1 + replyCount;
  } else {
    commentCount.value--;
  }
};
</script>

<style lang="scss" scoped>
.my-comment{
  height: 100%;
  .drawer-comment-main {
    height: 100%;
    width: 100%;
    .comment-num {
      height: 30px;
      display: flex;
      // align-items: center;
      color: #000000;
      font-size: 15px;
      overflow: hidden;
    }
    .arco-spin{
      height: calc(100% - 30px);
      .comment-content {
        position: relative;
        // overflow-y: scroll;
        overflow-y: auto;
        // 滚动条外观设置
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-track {
          // background: $base-menu-background;
          background: rgb(179, 179, 179, 0);
          border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
          width: 6px;
          background: $base-orange;
          border-radius: 10px;
        }
    
        .new-comment {
          display: flex;
          flex-direction: column-reverse;
        }
        > .arco-spin {
          height: 70px;
          margin: 0 10px 5px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .comment-end {
          color: $text-gray;
          font-size: 14.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
        }
      }
      .comment-content{
        height: calc(100% - 102px);
      }
      .comment-content-reply{
        height: calc(100% - 132px);
      }
    }
    // :style="{
    //         height: `calc(100vh - 116px - ${isReply ? '143px' : '113px'} )`,
    //       }"
    
  }
}
</style>
