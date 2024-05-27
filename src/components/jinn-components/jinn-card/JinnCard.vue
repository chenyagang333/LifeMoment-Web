<template>
  <template v-if="showDisplay">
    <div class="JinnCard" :class="ShowClass" ref="showRef">
      <!-- 更多 -------------------------------------------------------->
      <slot></slot>
      <!-- 顶部 -------------------------------------------------------->
      <!-- 顶部 -->
      <card-header
        :userAvatar="userAvatarURL"
        :userId="userId"
        :userName="userName"
        :publishTime="createTime"
        :publishAddress="publishAddress"
        :avatarCardPosition="avatarCardPosition"
      ></card-header>
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
            <comment-option2
              type="share"
              v-model:count="shareCount"
              @click-handle="() => console.log('分享 :>> ', '444')"
            ></comment-option2>
            <comment-option
              :isActive="starActive"
              type="star"
              @change-status="(active:boolean,func:any) => $emit('changeStarState',active,func)"
              v-model:count="starCount"
              v-model:active="starActive"
            ></comment-option>
            <comment-option2
              type="chat"
              @click="$emit('comment-handler')"
              v-model:count="commentCount"
            ></comment-option2>
            <comment-option
              bottom="4px"
              :isActive="likeActive"
              type="heart"
              @change-status="(active:boolean,func:any) => $emit('changeLikeState',active,func)"
              v-model:count="likeCount"
              v-model:active="likeActive"
            ></comment-option>
          </div>
        </div>
        <!-- 点赞的用户 -->
        <div class="likeUsers" v-if="likeCount && likeCount > 0">
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

const likeActive = defineModel<boolean>("likeActive", { default: false });
const starActive = defineModel<boolean>("starActive", { default: false });
const likeCount = defineModel<number>("likeCount", { default: 0 });
const commentCount = defineModel<number>("commentCount", { default: 0 });
const starCount = defineModel<number>("starCount", { default: 0 });
const shareCount = defineModel<number>("shareCount", { default: 0 });

const props = defineProps<{
  content: string;
  files?: any;
  id: number;
  userAvatarURL: string;
  userName: string; //
  publishAddress: string; //
  userId: number;
  likeUsers?: string[];
  createTime: string;
  likeActive: boolean;
  starActive: boolean;
  viewCount: number;


  avatarCardPosition?:string;
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


.JinnCard {
  background-color: rgb(255, 255, 255);
  // max-width: 700px;
  min-width: 335px;
  margin: 0 auto;
  margin-bottom: 10px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  position: relative;
  transition: height 0.3s, border 0.04s, margin-bottom 0.3s;
  @include respond-to("phone") {
    width: 100%;
  }
  @include respond-to("pad") {
    width: 100%;
  }
  @include respond-to("notebook") {
    width: 650px;
  }
  @include respond-to("desktop") {
    width: 650px;
  }
  @include respond-to("tv") {
    width: 650px;
  }

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
        min-width: 280px;
      }
    }
    .likeUsers {
      font-size: 14px;
      color: #000000;
      line-height: 1.2;
    }
  }
}
</style>
