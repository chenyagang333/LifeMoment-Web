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
          @click="$emit('share-handler')"
        ></comment-option2>
        <comment-option
          type="star"
          @change-status="(active:boolean) => $emit('changeStarState',active)"
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
          @change-status="(active:boolean) => $emit('changeLikeState',active)"
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
import { JinnProductionCardFooterType } from "./card-footer";

withDefaults(defineProps<JinnProductionCardFooterType>(), {});

const emit = defineEmits<{
  (e: "share-handler"): void;
  (e: "comment-handler"): void;
  (e: "changeLikeState", active: boolean): void;
  (e: "changeStarState", active: boolean): void;
}>();
</script>

<style scoped lang="scss">
// 底部
.card-footer {
  padding: 20px;
  padding-top: 0;
  width: 100%;
  margin-top: 5px;
  .items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid var(--el-border-color);
    margin-bottom: 10px;
    .views {
      font-size: 14px;
      color: #646464;
      display: flex;
      align-items: center;
    }
    .options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 280px;
    }
  }
  .likeUsers {
    font-size: 14px;
    color: #000000;
    line-height: 1.2;
  }
}
</style>
