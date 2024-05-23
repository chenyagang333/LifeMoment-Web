<template>
  <div>
    <JinnCard
      @changeLikeState="(active, func) => changeState(active, 0, func)"
      @changeStarState="(active, func) => changeState(active, 1, func)"
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
      :commentCount="commentCount"
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
}>();
const props = defineProps<{
  isNewPublish?: boolean;
  cardData: ShowType;
}>();
const {
  files,
  id,
  userAvatarURL,
  userId,
  userName,
  createTime,
  publishAddress,
  content,
  likeUsers,
  viewCount,
  likeCount,
  starCount,
  shareCount,
  likeActive,
  starActive,
} = props.cardData;
const commentCount = ref(props.cardData.commentCount);

// typei 0代表点赞，1代表收藏
const changeState = async (active: boolean, typei: number, fun: any) => {
  let url = "YouShow/"; // 完整的URL为 YouShow/LikeShow
  if (!active) url += "Cancel";
  const types = ["LikeShow", "StarShow"];
  url += types[typei];
  try {
    const res = await get(url, { youshowId: id });
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
