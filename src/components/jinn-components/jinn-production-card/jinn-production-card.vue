<template>
  <div class="jinn-jinn-production-card"
  >
    <!-- 头部 -->
    <CardHeader
      :userId="userId"
      :userAvatar="userAvatar"
      :userName="userName"
      :publishTime="publishTime"
      :publishAddress="publishAddress"
      :avatarCardPosition="avatarCardPosition"
      @clickUser="$emit('clickUser')"
    >
    </CardHeader>
    <!-- 内容 -->
    <CardMain
      :content="content"
      :urls="urls"
      @clickFile="(i:number) => $emit('clickFile', i)"
    ></CardMain>
    <!-- 底部 -->
    <CardFooter
      :likeUsers="likeUsers"
      :likeActive="likeActive"
      :starActive="starActive"
      :likeCount="likeCount"
      :commentCount="commentCount"
      :starCount="starCount"
      :shareCount="shareCount"
      :viewCount="viewCount"
      @share-handler="$emit('share-handler')"
      @comment-handler="$emit('comment-handler')"
      @changeLikeState="(active: boolean) => $emit('changeLikeState',active)"
      @changeStarState="(active: boolean) => $emit('changeStarState',active)"
    ></CardFooter>
  </div>
</template>

<script setup lang="ts">
import CardHeader from "./components/card-header/card-header.vue";
import CardMain from "./components/card-main/card-main.vue";
import CardFooter from "./components/card-footer/card-footer.vue";
import { productionCardProps } from "./jinn-production-card";

defineProps<productionCardProps>();

defineEmits<{
  (e: "clickUser"): void;
  (e: "clickFile", index: number): void;
  (e: "share-handler"): void;
  (e: "comment-handler"): void;
  (e: "changeLikeState", active: boolean): void;
  (e: "changeStarState", active: boolean): void;
}>();
</script>

<style scoped>
.jinn-jinn-production-card {
  background-color: var(--jinn-color1);
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--el-border-color);
  min-width: 335px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
}
</style>
