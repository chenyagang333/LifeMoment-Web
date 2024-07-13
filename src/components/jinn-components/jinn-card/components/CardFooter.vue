<template>
  <div class="card-footer">
    <!-- 点赞评论等选项 -->
    <div class="items">
      <div class="views">
        <i class="bi bi-eye" v-if="viewCount > 0"> 浏览{{ viewCount }}次</i>
      </div>
      <div class="options">
        <comment-option2
          type="share"
          :count="shareCount"
          @click="() => console.log('分享 :>> ', '444')"
        ></comment-option2>
        <comment-option
          type="star"
          @change-status="(active:boolean,func:any) => $emit('changeStarState',active,func)"
          :count="starCount"
          :active="starActive"
        ></comment-option>
        <comment-option2
          type="chat"
          @click="$emit('comment-handler')"
          :count="commentCount"
        ></comment-option2>
        <comment-option
          bottom="4px"
          type="heart"
          @change-status="(active:boolean,func:any) => $emit('changeLikeState',active,func)"
          :count="likeCount"
          :active="likeActive"
        ></comment-option>
      </div>
    </div>
    <!-- 点赞的用户 -->
    <div class="likeUsers" v-if="likeCount && likeCount > 0">
      {{ likeUsers?.join("、") }}共{{ likeCount }}人喜欢
    </div>
  </div>
</template>

<script setup lang="ts">
import commentOption from "@/components/comment-option/category1.vue";
import commentOption2 from "@/components/comment-option/category2.vue";

withDefaults(
  defineProps<{
    likeUsers?: string[];
    likeActive: boolean;
    starActive: boolean;
    likeCount: number;
    commentCount: number;
    starCount: number;
    shareCount: number;
    viewCount: number;
  }>(),
  {}
);
</script>

<style scoped></style>
