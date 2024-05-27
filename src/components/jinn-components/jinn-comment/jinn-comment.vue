<template>
  <div class="JinnComment">
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
      >
        <!-- ----------------------------新增评论 评论区----------------------------- -->
        <div class="new-comment">
          <comment-item
            v-for="(c, index) in newComments"
            :key="index"
            :commentData="c"
            @reply-handle="() => replyHandle(index, true, false, c.userName)"
            @delete-comment="
              $emit('del', c.id, CommentType.Comment, c.replyCount!)
            "
            @changeStatus="(isActive:boolean,func:Function) => $emit('changeStatus',c.id,isActive,CommentType.Comment ,func )"
          >
            <div class="newCommentAddReply">
              <!-- 新增评论回复区 -->
              <item-reply
                ref="newCommentReplyRefs"
                :comment-id="c.id"
                v-model:replyCount="c.replyCount!"
                @reply-handle="(userName:string) => replyHandle(index, true, true,userName)"
                @delete-comment="(id:number) => $emit('del', id, CommentType.Reply, 1)"
                @loadReply="(pageSize:number,pageIndex:number,func: CallBack) => $emit('loadReply',c.id ,pageSize,pageIndex,func)"
                @changeStatus="(id:number,isActive:boolean,func:Function) => $emit('changeStatus',id,isActive,CommentType.Reply ,func )"
              ></item-reply>
            </div>
          </comment-item>
        </div>
        <!-- ----------------------------评论区------------------------ ----- -->
        <comment-item
          v-for="(c, index) in comments"
          :key="index"
          :commentData="c"
          @reply-handle="() => replyHandle(index, false, false, c.userName)"
          @delete-comment="
            $emit('del', c.id, CommentType.Comment, c.replyCount!)
          "
          @changeStatus="(isActive:boolean,func:Function) => 
          $emit('changeStatus',c.id,isActive,CommentType.Comment ,func )"
        >
          <!-- 新增评论回复区 -->
          <div class="commentAddReply">
            <item-reply
              ref="commentReplyRefs"
              :comment-id="c.id"
              v-model:replyCount="c.replyCount!"
              @reply-handle="(userName: string) => replyHandle(index, false, true, userName)"
              @delete-comment="(id:number) => $emit('del', id, CommentType.Reply, 1)"
              @loadReply="(pageSize: number, pageIndex: number, func: CallBack) => $emit('loadReply', c.id, pageSize, pageIndex, func)"
              @changeStatus="(id:number,isActive:boolean,func:Function) => $emit('changeStatus',id,isActive,CommentType.Reply ,func )"
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
</template>

<script setup lang="ts">
import { nextTick, onMounted, computed, ref, reactive } from "vue";
import CommentAdd from "@/components/comment-add/CommentAdd.vue";
import commentItem from "./comment-item/comment-item.vue";
import itemReply from "./comment-item/item-reply.vue";
import myMessage from "@/components/message/my-message.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { get, del, post } from "@/api/AHttp/api";
import { ElMessage, ClickOutside as vClickOutside } from "element-plus";
import { afterExecutionAsync } from "@/utils/utils";
import GetNowData from "@/utils/Time/NowDate";
import { GetAddressByYouShowAsync } from "@/api/Commen";
import { ApiResult } from "@/api/AHttp/api";
import type { CommentItem, CallBack } from "./comment-type.ts";
import { CommentType } from "./comment-type.ts";
import { FuncResult } from "@/components/jinn-types/ResultGenerics/ResultGenerics";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = defineProps<{
  showId: number;
}>();

const emit = defineEmits<{
  // 触发外部删除评论或回复请求
  (e: "del", id: number, CommentType: CommentType, delCount: number): void;
  // 点击恢复图标触发外部发布评论弹窗
  (e: "replyHandle", userName: string): void;
  (
    e: "loadComment",
    pageSize: number,
    pageIndex: number,
    func: (data: CommentItem[]) => void
  ): void;
  (
    e: "loadReply",
    commentId: number,
    pageSize: number,
    pageIndex: number,
    func: (data: CommentItem[]) => void
  ): void;
  (
    e: "changeStatus",
    id: number,
    isActive: boolean,
    commentType: CommentType,
    func: Function
  ): void;
}>();

//#region 评论数据初始化

const commentContentInit = ref(true);
onMounted(async () => {
  await pagingQueryComment();
  commentContentInit.value = false; // 初始化加载动画
});

//#endregion

//#region 加载评论

const commentLoadEnd = ref(false);
const comments = ref<Array<CommentItem>>([]);
let commentPageIndex = 1;
const pagingQueryComment = afterExecutionAsync(async () => {
  const pageSize = 10;
  // 触发其定义事件，调用外部查询方法，查询成功，调用匿名函数，查询的数据作为参数
  emit("loadComment", pageSize, commentPageIndex, (data: CommentItem[]) => {
    if (data?.length > 0) {
      commentPageIndex++;
      const commentIds = comments.value.map((x) => x.id);
      const newCommentIds = newComments.value.map((x) => x.id);
      const ids = [...commentIds, ...newCommentIds];
      const filterData = data.filter((x: any) => !ids.includes(x.id));
      comments.value.push(...filterData);
    }
    if (data?.length < pageSize) {
      commentLoadEnd.value = true;
    }
  });
});

//#endregion

//#region 发表评论或评论回复

const builderParams = async (content: string): Promise<CommentItem> => {
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

const newComments = ref<Array<CommentItem>>([]);

const newCommentReplyRefs = ref<any[]>([]);
const commentReplyRefs = ref<any[]>([]);

const commentAddRef = ref(); // 评论框实例
const isNewCommentReply = ref(); // 评论框实例选定：新评论的回复
const isReplyToReply = ref(); // 评论框实例选定：回复的回复

const commentContentRef = ref();
// const commentRefs = ref<any>([]);
// const newCommentRefs = ref<any>([]);
let commentIndex = 0; // 表示该回复列表在评论列表中的索引

const pushHandle = async (
  html: string,
  createFunc: (data: CommentItem) => Promise<FuncResult<number>>
) => {
  commentContentRef.value.style.scrollBehavior = "smooth";
  // 评论回复
  if (isReply.value) {
    const replyTemplateRef = getReplyTemplate(); // 评论模块获取实例
    const data = await builderParams(html); // 构建参数
    if (isReplyToReply.value) data.toUserName = _toUserName.value; // 为toUserName赋值
    data.commentId = getCommentTemplate().id; // 获取该回复所属评论的Id
    const funcResult = await createFunc(data);
    if (funcResult.ok) {
      data.id = funcResult.data;
      ShowPublishResultMessage.value = true;
      replyTemplateRef.pushReply(data);
      // 添加回复前，如果没有打开回复列表则打开(获取评论组件实例，加载评论)
      replyTemplateRef.openReplys();
      await nextTick();
      // 选择区域
      const className = isNewCommentReply.value
        ? ".newCommentAddReply"
        : ".commentAddReply";
      const replyTemplate =
        commentContentRef.value.querySelectorAll(className)[commentIndex];
      // 滚动到指定区域
      const setTop =
        replyTemplate.offsetTop +
        replyTemplate.offsetHeight -
        (1 / 2) * commentContentRef.value.offsetHeight;
      commentContentRef.value.scrollTop = setTop;
    } else {
      ElMessage(funcResult.msg);
    }
  } else {
    // 添加评论
    // 先发起请求获取数据
    const params = await builderParams(html);
    const funcResult = await createFunc(params);
    if (funcResult.ok) {
      ShowPublishResultMessage.value = true;
      params.id = funcResult.data;
      newComments.value.push(params);
    } else {
      ElMessage(funcResult.msg);
    }
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

const isReply = defineModel("isReply", { required: true, default: false });
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
  emit("replyHandle", userName);
};

//#endregion

//#region 评论回复后的提示消息

const ShowPublishResultMessage = ref(false);

//#endregion

defineExpose({ pushHandle });
</script>

<style lang="scss" scoped>
.JinnComment {
  height: 100%;
  width: 100%;
  position: relative;
  .arco-spin {
    height: 100%;
    .comment-content {
      height: 100%;
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
  }
}
</style>
