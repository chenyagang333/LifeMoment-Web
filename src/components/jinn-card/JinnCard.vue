<template>
  <template v-if="showDisplay">
    <div class="show" :class="ShowClass" ref="showRef">
      <!-- 更多 -------------------------------------------------------->
      <slot></slot>
      <!-- 顶部 -------------------------------------------------------->
      <el-header>
        <div class="headerImg">
          <hugs-popover-wrap distance="5">
            <el-avatar :size="50" :src="userAvatarURL"></el-avatar>
            <template #popover>
              <div class="user-card radius-overflow-border">
                <div class="user-card-header"></div>
              </div>
            </template>
          </hugs-popover-wrap>
        </div>
        <div class="userName">{{ userName }}</div>
        <div class="anputInfo">
          <span class="showTime">{{
            createTime?.substring(0, createTime.length - 3)
          }}</span>
          <span class="showIP"> 发布于 {{ publishAddress }}</span>
        </div>
      </el-header>
      <!-- show内容 -------------------------------------------------------->
      <card-main :content="content" :files="files"> </card-main>
      <!-- 点赞，评论等 -------------------------------------------------------->
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
              @change-status="(active:boolean,func:any) => $emit('changeStarState',active,func)"
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
              @change-status="(active:boolean,func:any) => $emit('changeLikeState',active,func)"
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
    </div>
  </template>
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

const showRef = ref();

const emit = defineEmits<{
  (e: "changeLikeState", active: boolean, func: any): void;
  (e: "comment-handler"): void;
  (e: "changeStarState", active: boolean, func: any): void;
}>();
const props = defineProps<{
  content:string;
  files:any;
  id:number;
  userAvatarURL:string;
  userName:string; //
  publishAddress:string; //
  userId:number;
  likeUsers?:string[];
  starCount:number;
  commentCount:number;
  createTime:string;
  likeCount:number;
  shareCount:number;
  likeActive:boolean;
  starActive:boolean;
  viewCount:number;
}>();


//#region 抽屉模块

// const InitDrawer = async () => {
//   openShow.value = true;
//   // showRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   const offset =
//     showRef.value.getBoundingClientRect().top + window.scrollY - 60;
//   // 调用 scrollTo() 方法使其滚动到指定位置
//   await nextTick();
//   window.scrollTo({ top: offset, behavior: "smooth" });
// };

//#endregion

//#region 右上角更多模块

const showDisplay = ref(true);

const removingAnimations = () => {
  showDisplay.value = false;
};

const openShow = ref(false);
const ShowClass = computed(() => (openShow.value ? "show-display" : ""));
//#endregion

const haveFile = computed(() => files && files.length > 0);
</script>

<style lang="scss" scoped>
.arco-dropdown-option-content {
  font-size: 15px;
}

.show {
  background-color: rgb(255, 255, 255);
  // max-width: 700px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  position: relative;
  transition: height 0.3s, border 0.04s, margin-bottom 0.3s;

  // 头部
  .el-header {
    padding-top: 10px;

    .headerImg {
      float: left;
      margin-right: 10px;
      position: relative;

      .user-card {
        width: 350px;
        height: 280px;
        background-color: white;
        .user-card-header {
          height: 80px;
          background-image: url("@/assets/home/hope.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          // background-position: center top;
          background-position: center top -10px;
          /* 负值表示往上移动 */
        }
      }
    }

    .userName {
      font-size: 16px;
      font-weight: 500;
      $height: 26px;
      height: $height;
      line-height: $height;
    }

    .anputInfo {
      $height: 26px;
      height: $height;
      line-height: $height;
      font-size: 13px;
      color: #646464;
    }
  }
  // 底部
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
}

.show-display,
.show > .card-right {
  height: calc(100vh - 80px);
  min-height: 650px;
  max-height: 855px;
}

.show-display {
  border-radius: 4px 0 0 4px;
}

.card-right-enter-active,
.card-right-leave-active {
  transition: all 0.2s ease;
}

.card-right-enter-from,
.card-right-leave-to {
  width: 0;
  opacity: 0;
}
</style>
