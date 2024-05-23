<template>
  <div class="card-footer">
    <!-- 点赞评论等选项 -->
    <div class="items">
      <div class="views">
        <i class="bi bi-eye" v-if="viewCount > 0"> 浏览{{ viewCount }}次</i>
      </div>
      <div class="options">
        <comment-option
          :count="starCount"
          :isActive="starActive"
          type="star"
          @change-status="(isActive:boolean,func:any) => changeState(isActive,LikeStar.Star,func)"
        ></comment-option>
        <comment-option2
          type="chat"
          :count="commentCount"
          @click="$emit('comment-handler')"
        ></comment-option2>
        <comment-option
          :count="likeCount"
          bottom="4px"
          :isActive="likeActive"
          type="heart"
          @change-status="(isActive:boolean,func:any) => changeState(isActive,LikeStar.Like,func)"
        ></comment-option>
        <!-- <comment-option2 type="share" :count="0"
                        @click-handle="() => console.log('分享 :>> ', '444')"></comment-option2> -->
      </div>
    </div>
    <!-- 点赞的用户 -->
    <div class="likeUsers" v-if="likeCount > 0">
      {{ likeUsers?.join("、") }}共{{ likeCount }}人喜欢
    </div>
  </div>
</template>

<script setup lang="ts">
import { get } from "@/api/AHttp/api";
import { ElMessage } from "element-plus";
import commentOption from '@/components/comment-option/category1.vue';
import commentOption2 from '@/components/comment-option/category2.vue';

defineEmits<{
  (e: "comment-handler"): void;
}>();

const props = defineProps<{
  showId: number;
  commentCount: number;
  likeCount: number;
  starCount: number;
  shareCount: number;
  viewCount: number;
  likeUsers?: string[];
  likeActive: boolean;
  starActive: boolean;
}>();

//#region youshow 点赞 收藏

enum LikeStar {
  Like,
  Star,
}
const changeState = async (isActive: boolean, type: LikeStar, fun: any) => {
  let url = "YouShow/";
  if (isActive) {
    if (type == LikeStar.Like) {
      url += "LikeShow";
    } else if (type == LikeStar.Star) {
      url += "StarShow";
    }
  } else {
    if (type == LikeStar.Like) {
      url += "CancelLikeShow";
    } else if (type == LikeStar.Star) {
      url += "CancelStarShow";
    }
  }
  try {
    const res = await get(url, { youshowId: props.showId });
    if (res.code == 200) {
    } else {
      fun();
      ElMessage(res.message);
    }
  } catch {
    fun();
  }
};

//#endregion
</script>

<style lang="scss" scoped>
.card-footer {
  padding: 20px;
  padding-top: 0;
  width: 100%;
  .items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid var(--el-border-color-light);
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
      min-width: 190px;
    }
  }
  .likeUsers {
    font-size: 14px;
    color: #000000;
    line-height: 1.2;
  }
}
</style>
