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
import cardHeader from "./card-header.vue";
import cardOption from "./more-option.vue";
import cardMain from "./card-main.vue";
import cardFooter from "./card-footer.vue";
import myComment from "./card-extend/my-comment.vue";
import cardRight from "./card-extend/card-right/card-right.vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import { ElMessage } from "element-plus";
import commentOption from "@/components/comment-option/category1.vue";
import commentOption2 from "@/components/comment-option/category2.vue";

import JinnCard from "@/components/jinn-card/JinnCard.vue";
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
