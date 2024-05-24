<template>
  <div>
    <JinnCard
      @changeLikeState="(active, func) => changeState(active, 0, func)"
      @changeStarState="(active, func) => changeState(active, 1, func)"
      @commentHandler="() => $emit('comment-handler')"
      :files="files"
      :id="id"
      :userAvatarURL="userAvatarURL"
      :userId="userId"
      :userName="userName"
      :createTime="createTime"
      :publishAddress="publishAddress"
      :content="content"
      :likeUsers="likeUsers"
      :viewCount="viewCount"
      :likeCount="likeCount"
      :starCount="starCount"
      :shareCount="shareCount"
      :likeActive="likeActive"
      :starActive="starActive"
      v-model:comment-count="commentCount"
    >
    </JinnCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import { ElMessage } from "element-plus";

import JinnCard from "@/components/jinn-components/jinn-card/JinnCard.vue";
import { get } from "@/api/AHttp/api";

const emit = defineEmits<{
  (e: "changeLikeState", active: boolean, func: any): void;
  (e: "changeStarState", active: boolean, func: any): void;
  (e: "comment-handler"): void;
}>();
const commentCount = defineModel('commentCount');
const props = defineProps<{
  isNewPublish?: boolean;

  content: string;
  files?: any;
  id: number;
  userAvatarURL: string;
  userName: string; //
  publishAddress: string; //
  userId: number;
  likeUsers?: string[];
  starCount: number;
  createTime: string;
  likeCount: number;
  shareCount: number;
  likeActive: boolean;
  starActive: boolean;
  viewCount: number;
}>();


// typei 0代表点赞，1代表收藏
const changeState = async (active: boolean, typei: number, fun: any) => {
  let url = "YouShow/"; // 完整的URL为 YouShow/LikeShow ,取消点赞为 YouShow/CancelLikeShow
  if (!active) url += "Cancel";
  const types = ["LikeShow", "StarShow"];
  url += types[typei];
  try {
    const res = await get(url, { youshowId: props.id });
    if (res.code == 200) {
    } else {
      fun();
      ElMessage(res.message);
    }
  } catch {
    fun();
  }
};
</script>

<style scoped></style>
