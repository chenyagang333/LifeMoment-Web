<!-- 有评论则展示 -->
<template>
  <template v-if="replyCount > 0">
    <div class="item-reply">
      <!-- 展开回复按钮 -->
      <span v-show="!computedReplyOpened" class="mx-1 reply-header" type="info">
        —— &nbsp;
        <span class="replys-header-span" @click="openReplys()">
          展开{{ replyCount }}条回复
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>
      </span>
      <!-- 评论回复 -->
      <div v-show="computedReplyOpened">
        <!-- 评论回复区域 -->
        <comment-item
          v-for="(i, index) in replyList"
          :key="index"
          :comment-data="i"
          @reply-handle="$emit('reply-handle', i.userName)"
          @delete-comment="deleteComment"
          isReply
        ></comment-item>
      </div>
      <!-- 按钮 -->
      <template v-if="computedReplyOpened">
        <div>
          <div class="load-spins">
            <a-spin dot v-show="replyLoading" />
          </div>
          <div v-show="!replyLoading">
            <span class="mx-1 reply-header" type="info"> —— &nbsp; </span>
            <!-- 加载更多回复按钮 -->
            <span
              v-if="replyList.length < replyCount"
              class="mx-1 reply-header"
              type="info"
            >
              <span class="replys-header-span" @click="loadReplys()">
                展开更多
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </span>
            </span>
            <!-- 收起回复按钮 -->
            <span class="mx-1 reply-header" type="info">
              <span class="replys-header-span" @click="closeReplys()">
                收起
                <el-icon>
                  <ArrowUp />
                </el-icon>
              </span>
            </span>
          </div>
        </div>
      </template>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import commentItem from "./comment-item.vue";
import { CommentReplyType } from "@/types/Layout1/youshow/show-card";
import { get } from "@/api/AHttp/api";

const props = defineProps<{
  commentId: number;
  // newAddReplyList?: CommentReplyType[]; // 新增回复
}>();

// 添加或回复或删除回复时对变量进行操作
const replyCount = defineModel<number>("replyCount", { required: true });

const replyList = ref<CommentReplyType[]>([]);

const emit = defineEmits<{
  // 点击回复按钮回调
  (e: "reply-handle", userName: string): void;
  (e: "delete-comment"): void;
}>();

const replyOpened = ref(false); // 初始状态没有展开回复

// 打开评论的回复
const openReplys = async () => {
  replyOpened.value = true; // 展开评论的回复
  if (addNumber.value == delNumber.value) {
    await loadReplys();
  }
};

const addNumber = ref(0);
const delNumber = ref(0);
// 新增回复
const pushReply = (reply: CommentReplyType) => {
  reply.isNewAdd = true;
  replyList.value.push(reply);
  replyCount.value++;
  addNumber.value++;
};
defineExpose({ openReplys, pushReply });

const deleteComment = () => {
  delNumber.value++;
  replyCount.value--;
  if (addNumber.value == delNumber.value) {
    replyList.value = [];
  }
  emit("delete-comment");
};

const computedReplyOpened = computed(() =>
  delNumber.value != addNumber.value
    ? replyOpened.value
    : addNumber.value == 0
    ? replyOpened.value
    : false
);

// 收起评论的回复
const closeReplys = async () => {
  replyOpened.value = false; // 收起展开评论的回复
};

const replyLoading = ref(false);
let loadReplyPageIndex = 1;
// 加载评论的回复
const loadReplys = async () => {
  replyLoading.value = true; // 正在加载评论
  const params = {
    pageIndex: loadReplyPageIndex,
    pageSize: 10,
    commentId: props.commentId,
  };
  const res = await get("Reply/PagingQueryByCommentId", params);
  if (res.code == 200) {
    const replyIds = replyList.value
      .map((x) => x.id);
    const filterData = res.data.filter((x: any) => !replyIds.includes(x.id));
    replyList.value.push(...filterData);
    loadReplyPageIndex++;
    addNumber.value += filterData.length; // 更新添加数据数
  }
  replyLoading.value = false; // 评论加载完成
};
</script>

<style lang="scss" scoped>
.item-reply {
  .load-spins {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
  }
  .reply-header {
    cursor: default;
    color: #909399;
    .replys-header-span {
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

.replys {
  margin-top: 5px;

  > .new-add-comment-childern {
    display: flex;
    flex-direction: column-reverse;
  }

  > .reply-main {
  }

  .arco-spin {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
  }
}
</style>
