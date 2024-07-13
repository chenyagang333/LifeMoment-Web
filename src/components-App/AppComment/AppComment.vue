<template>
  <div class="AppComment">
    <div class="comment-num" style="height: 22px; line-height: 22px">
      全部评论({{ commentCount }})
    </div>
    <div
      ref="commentContainerRef"
      class="AppCommentContent"
      :style="{ height: `calc(100% - ${isReply ? '154px' : '123px'})` }"
      v-loading="!commentContentInitEnd"
      element-loading-text="努力加载中..."
      v-infinite-scroll="pagingQueryComment"
      infinite-scroll-distance="60"
      :infinite-scroll-immediate="false"
      :infinite-scroll-disabled="commentLoadEnd"
    >
      <!-- new-add-comment-area -->
      <template v-if="newComments.length > 0">
        <JinnList :data-source="newComments" columnReverse>
          <template #renderItem="{ item: c, index, itemRef: newCRef }">
            <JinnComment ref="newCommentRefs">
              <template #avatar>
                <el-avatar
                  :size="40"
                  :src="FileIP + c.userAvatarURL"
                ></el-avatar>
              </template>
              <template #author>
                <AppCommentAuthor :userName="c.userName"></AppCommentAuthor>
              </template>
              <template #content>
                <JinnContent :content="c.content"></JinnContent>
                <template v-if="false">
                  <JinnContentFiles :urls="['']"></JinnContentFiles>
                </template>
              </template>
              <template #datetime>
                {{ c.createTime }}
              </template>
              <template #actions>
                <AppCommentSendTip
                  :sendIng="c.sendIng"
                  :sendError="c.sendError"
                ></AppCommentSendTip>
                <comment-option2
                  type="chat"
                  :size="15"
                  text="回复"
                  @click="replyHandler(c, newCRef, false)"
                ></comment-option2>
                <comment-option
                  :count="c.likeCount"
                  :active="c.likeActive"
                  bottom="3px"
                  @change-status="(active:boolean) =>changeStatus(CommentType.Comment,c, active)"
                  type="heart"
                  :size="16"
                ></comment-option>
              </template>
              <template #options
                ><AppCommentOptions :showDelete="true" @delete="">
                </AppCommentOptions
              ></template>
              <AppExpandReply
                v-if="c.replyCount > 0"
                :showLoadMoreBtn="c.replyList?.length < c.replyCount"
                :replyCount="c.replyCount"
                :replyOpen="c.replyOpen"
                @openReply="(loadReply:Function) => openReply(c,loadReply)"
                @closeReply="closeReply(c, newCRef)"
                @loadReply="(loaded:Function) => loadReply(c,loaded)"
              >
                <template v-if="c.replyList && c.replyList.length > 0">
                  <JinnList :data-source="c.replyList">
                    <template #renderItem="{ item: r, index }">
                      <JinnComment>
                        <template #avatar>
                          <el-avatar
                            :size="20"
                            :src="FileIP + r.userAvatarURL"
                          ></el-avatar>
                        </template>
                        <template #author>
                          <AppCommentAuthor
                            :userName="r.userName"
                            :toUserName="r.toUserName"
                          ></AppCommentAuthor>
                        </template>
                        <template #content>
                          <JinnContent :content="r.content"></JinnContent>
                          <template v-if="false">
                            <JinnContentFiles :urls="['']"></JinnContentFiles>
                          </template>
                        </template>
                        <template #datetime>
                          {{ r.createTime }}
                        </template>
                        <template #actions>
                          <AppCommentSendTip
                            :sendIng="r.sendIng"
                            :sendError="r.sendError"
                          ></AppCommentSendTip>
                          <comment-option2
                            type="chat"
                            :size="15"
                            text="回复"
                            @click="replyHandler(c, newCRef, true)"
                          ></comment-option2>
                          <comment-option
                            :count="r.likeCount"
                            :active="r.likeActive"
                            bottom="3px"
                            @change-status="(active:boolean) =>changeStatus(CommentType.Reply,r, active)"
                            type="heart"
                            :size="16"
                          ></comment-option>
                        </template>
                        <template #options
                          ><AppCommentOptions :showDelete="true" @delete="">
                          </AppCommentOptions
                        ></template>
                      </JinnComment>
                    </template>
                  </JinnList>
                </template>
              </AppExpandReply>
            </JinnComment>
          </template>
        </JinnList>
      </template>
      <!-- comment-area -->
      <JinnList :data-source="comments">
        <template #renderItem="{ item: c, index, itemRef: cRef }">
          <JinnComment ref="commentRefs">
            <template #avatar>
              <el-avatar :size="40" :src="FileIP + c.userAvatarURL"></el-avatar>
            </template>
            <template #author>
              <AppCommentAuthor :userName="c.userName"></AppCommentAuthor>
            </template>
            <template #content>
              <JinnContent :content="c.content"></JinnContent>
              <template v-if="false">
                <JinnContentFiles :urls="['']"></JinnContentFiles>
              </template>
            </template>
            <template #datetime>
              {{ c.createTime }}
            </template>
            <template #actions>
              <AppCommentSendTip
                :sendIng="c.sendIng"
                :sendError="c.sendError"
              ></AppCommentSendTip>
              <comment-option2
                type="chat"
                :size="15"
                text="回复"
                @click="replyHandler(c, cRef, false)"
              ></comment-option2>
              <comment-option
                :count="c.likeCount"
                :active="c.likeActive"
                bottom="3px"
                @change-status="(active:boolean) =>changeStatus(CommentType.Comment,c, active)"
                type="heart"
                :size="16"
              ></comment-option>
            </template>
            <template #options
              ><AppCommentOptions :showDelete="true" @delete="">
              </AppCommentOptions
            ></template>
            <AppExpandReply
              v-if="c.replyCount > 0"
              :showLoadMoreBtn="c.replyList?.length < c.replyCount"
              :replyCount="c.replyCount"
              :replyOpen="c.replyOpen"
              @openReply="(loadReply:Function) => openReply(c,loadReply)"
              @closeReply="closeReply(c, cRef)"
              @loadReply="(loaded:Function) => loadReply(c,loaded)"
            >
              <template v-if="c.replyList && c.replyList.length > 0">
                <JinnList :data-source="c.replyList">
                  <template #renderItem="{ item: r, index }">
                    <JinnComment>
                      <template #avatar>
                        <el-avatar
                          :size="20"
                          :src="FileIP + r.userAvatarURL"
                        ></el-avatar>
                      </template>
                      <template #author>
                        <AppCommentAuthor
                          :userName="r.userName"
                          :toUserName="r.toUserName"
                        ></AppCommentAuthor>
                      </template>
                      <template #content>
                        <JinnContent :content="r.content"></JinnContent>
                        <template v-if="false">
                          <JinnContentFiles :urls="['']"></JinnContentFiles>
                        </template>
                      </template>
                      <template #datetime>
                        {{ r.createTime }}
                      </template>
                      <template #actions>
                        <AppCommentSendTip
                          :sendIng="r.sendIng"
                          :sendError="r.sendError"
                        ></AppCommentSendTip>
                        <comment-option2
                          type="chat"
                          :size="15"
                          text="回复"
                          @click="replyHandler(c, cRef, true)"
                        ></comment-option2>
                        <comment-option
                          :count="r.likeCount"
                          :active="r.likeActive"
                          bottom="3px"
                          @change-status="(active:boolean) =>changeStatus(CommentType.Reply,r, active)"
                          type="heart"
                          :size="16"
                        ></comment-option>
                      </template>
                      <template #options
                        ><AppCommentOptions :showDelete="true" @delete="">
                        </AppCommentOptions
                      ></template>
                    </JinnComment>
                  </template>
                </JinnList>
              </template>
            </AppExpandReply>
          </JinnComment>
        </template>
      </JinnList>
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
    <CommentAdd
      style="position: absolute; bottom: 0; width: 100%; min-width: 310px"
      minHeight="60px"
      ref="commentAddRef"
      v-model="isReply"
      @push-handle="(html: string) => pushHandle(html)"
      :toUserName="toUserName"
    ></CommentAdd>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref } from "vue";
import { CommentItem, CommentType } from "./AppCommentType";
import AppEmpty from "@/components-App/AppEmpty/AppEmpty.vue";
import JinnList from "@/components/jinn-components/jinn-list/jinn-list.vue";
import JinnComment from "@/components/jinn-components/jinn-comment/jinn-comment.vue";
import JinnContent from "@/components/jinn-components/jinn-content/jinn-content.vue";
import JinnContentFiles from "@/components/jinn-components/jinn-content/jinn-content-files/jinn-content-files.vue";
import CommentOption from "@/components/comment-option/category1.vue";
import CommentOption2 from "@/components/comment-option/category2.vue";
import { ApiResult, get, post } from "@/api/AHttp/api";
import CommentAdd from "@/components/comment-add/CommentAdd.vue";
import AppCommentOptions from "./components/AppCommentOptions.vue";
import AppExpandReply from "./components/AppExpandReply.vue";
import AppCommentAuthor from "./components/AppCommentAuthor.vue";
import AppCommentSendTip from "./components/AppCommentSendTip.vue";
import { GetAddressByYouShowAsync } from "@/api/Commen";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import GetNowData from "@/utils/Time/NowDate";
import { ElMessage } from "element-plus";

const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = withDefaults(
  defineProps<{
    // appUserId: number; // 当前登录用户Id
    // propMap: Partial<CommentPropMap>;
    // distinct?: boolean;
    byId: number;
    commentCount: number;
  }>(),
  {}
);

//#region 加载 显示数据模块

const commentContainerRef = ref(); // 滚动容器实例
const commentRefs = ref<any[]>([]); // 评论组件实例
const comments = ref<Array<CommentItem>>([]); // 评论数据
const newComments = ref<Array<CommentItem>>([]); // 新增评论数据
const commentContentInitEnd = ref(false);
//#region 加载评论
const loadDataIng = ref<boolean>(false);
const commentLoadEnd = ref(false);
let commentPageIndex = 1;
const pageSize = 10;
// load comment data
const pagingQueryComment = async () => {
  // 防止多次加载相同数据
  if (!loadDataIng.value) {
    pagingQueryComment_Begin();
    const res = await loadComment(pageSize, commentPageIndex);
    let data = res.data;
    if (res.code === 200) {
      if (data?.length > 0) {
        commentPageIndex++;
        // 过滤已存在的评论
        data = commentItem_DataDistinct(
          [...comments.value, ...newComments.value],
          data
        );
      }
      comments.value.push(...data);
    }
    pagingQueryComment_End(data?.length);
  }
};
// begin action
const pagingQueryComment_Begin = () => {
  loadDataIng.value = true;
};
// end action
const pagingQueryComment_End = (dataLength: number = 0) => {
  if (dataLength < pageSize) {
    commentLoadEnd.value = true;
  }
  loadDataIng.value = false;
  if (!commentContentInitEnd.value) {
    commentContentInitEnd.value = true; // 结束初始化加载动画
  }
};
// distinct
const commentItem_DataDistinct = (
  baseData: CommentItem[],
  data: CommentItem[]
) => {
  if (baseData.length > 20) {
    return data;
  }
  const ids = baseData.map((x) => x.id);
  return data.filter((x: any) => !ids.includes(x.id));
};
// load comment
const loadComment = async (pageSize: number, pageIndex: number) => {
  const res = await get("Comment/PagingQueryByShowId", {
    showId: props.byId,
    pageSize,
    pageIndex,
  });
  return res;
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
  // emit("delete", data.id, commentType, () => {
  //   data.replyCount! -= deleCount;
  // });
};

//#region 点击回复按钮

const replyHandler = (
  data: CommentItem,
  template: any,
  _isReplyToReply: boolean
) => {
  isReplyToReply.value = _isReplyToReply;
  commentHandlerData.value = data;
  isReply.value = true;
  toUserName.value = commentHandlerData.value.userName;
  commentHandlerTemplate.value = template;
  commentAddRef.value?.focusTextArea(); // 激活窗口，刷新窗口的状态
};

//#endregion

//#region 更新点赞状态
// 更新点赞状态
const changeStatus = async (
  commentType: CommentType,
  data: CommentItem,
  active: boolean
) => {
  updateStatus(data, active); // 更新状态
  const res = await changeStatusHttp(data.id, active, commentType);
  if (res.code == 200) {
    if (active) {
      ElMessage.success("点赞成功！");
    } else {
      ElMessage.info("取消点赞成功！");
    }
  } else {
    resetStatus(data, active);
  }
};
const updateStatus = (data: CommentItem, active: boolean) => {
  data.likeActive = active;
  data.likeCount += active ? 1 : -1;
};
const resetStatus = (data: CommentItem, active: boolean) => {
  data.likeActive = !active;
  data.likeCount += !active ? 1 : -1;
};
const changeStatusHttp = async (
  id: number,
  isActive: boolean,
  commentType: CommentType
) => {
  const updateType = isActive ? 1 : 0;
  const url =
    commentType === CommentType.Comment
      ? "Comment/UpdateLikeComment"
      : "Reply/UpdateLikeReply";
  return await get(url, { id, updateType });
};
//#endregion

//#region 评论回复模块
const openReply = (data: CommentItem, _loadReply: Function) => {
  data.replyOpen = true;
  const replyListCount = data.replyList ? data.replyList?.length : 0;
  const replyCount = data.replyCount ?? 0;
  if (replyListCount < replyCount) {
    _loadReply();
  }
};
const closeReply = async (data: CommentItem, element: any) => {
  data.replyOpen = false;
  await nextTick();
  scrollContentCenter(commentContainerRef.value, element);
};
const loadReply = async (data: CommentItem, loaded: Function) => {
  data.replyLoadIndex = data.replyLoadIndex ? ++data.replyLoadIndex : 1;
  console.log("object :>> ", data.replyLoadIndex);
  const res = await get("Reply/PagingQueryByCommentId", {
    commentId: data.id,
    pageSize,
    pageIndex: data.replyLoadIndex,
  });
  if (res.code === 200) {
    if (!data.replyList) data.replyList = [];
    res.data = commentItem_DataDistinct(data.replyList, res.data);
    data.replyList.push(...res.data);
  }
  loaded();
};
//#endregion

//#region 添加评论或回复模块
const commentAddRef = ref();
const isReply = ref<boolean>(false);
const toUserName = ref<string>("");
const isReplyToReply = ref<boolean>(false); // 是否为评论回复的回复
const commentHandlerTemplate = ref<any>(0); // 当前评论Dom实例，用于评论后滑动容器到底部
const commentHandlerData = ref<CommentItem>({} as CommentItem); // 储存对象的引用
const pushHandle = async (html: string) => {
  let data = await builderParams(html);
  pushHandleAction(data);
  data.sendIng = true;
  const res = await pushHandleHttp(data);
  const newObj = isReply.value
    ? commentHandlerData.value.replyList![
        commentHandlerData.value.replyList!.length - 1
      ]
    : newComments.value[newComments.value.length - 1];
  if (res.code == 200) {
    ElMessage.success("评论成功！");
    data.id = res.data;
    newObj.sendIng = false;
  } else {
    newObj.sendError = true;
    ElMessage.error("操作失败！");
  }
};

const pushHandleHttp = async (data: CommentItem) => {
  let res: ApiResult<number>;
  if (isReply.value) {
    data.commentId = commentHandlerData.value.id;
    res = await post("Reply/CreateReply", data);
  } else {
    res = await post("Comment/CreateComment", data);
  }
  return res;
};

const builderParams = async (html: string): Promise<CommentItem> => {
  const resAddress = await GetAddressByYouShowAsync();
  return {
    id: 0,
    userId: userData.value?.id!,
    userAvatarURL: userData.value?.userAvatar!,
    userName: userData.value?.userName!,
    createTime: GetNowData(),
    publishAddress: resAddress,
    content: html,
    showId: props.byId,
    likeCount: 0,
    likeActive: false,
    toUserName: "",
    replyCount: 0,
  };
};

const pushHandleAction = (data: CommentItem) => {
  commentContainerRef.value.style.scrollBehavior = "smooth";
  if (isReply.value) {
    // 赋值 toUserName
    if (isReplyToReply.value) data.toUserName = toUserName.value;
    // 赋值 replyList
    if (!commentHandlerData.value.replyList) {
      commentHandlerData.value.replyList = [];
    }
    commentHandlerData.value.replyList?.push(data);
    // 打开回复列表
    commentHandlerData.value.replyOpen = true;
    // 赋值 replyCount
    if (commentHandlerData.value.replyCount) {
      commentHandlerData.value.replyCount += 1;
    } else {
      commentHandlerData.value.replyCount = 1;
    }
    scrollContentCenter(
      commentContainerRef.value,
      commentHandlerTemplate.value
    );
  } else {
    // 赋值 newComments
    newComments.value.push(data);
    // 滚动容器到指定位置
    commentContainerRef.value.scrollTop = 0;
  }
};

// 滚动容器，使指定元素滚动到容器中间
const scrollContentCenter = (formElement: any, toElement: any) => {
  const replyTemplate = toElement;
  const setTop =
    replyTemplate.offsetTop +
    replyTemplate.offsetHeight -
    (1 / 2) * formElement.offsetHeight;
  formElement.scrollTop = setTop;
};
//#endregion

//#region
//#endregion
</script>

<style scoped lang="scss">
.AppComment {
  position: relative;
  height: 100%;
  .AppCommentContent {
    height: 100%;
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
    .comment-end {
      color: $text-gray;
      font-size: 14.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      margin-bottom: 50px;
    }
    .loadComment {
      width: 100%;
      height: 45px;
      margin-bottom: 20px;
      // --el-mask-color: rgba(0,0,0,0);
    }
  }
}
</style>
