<template>
  <div class="JinnCard">
    <!-- 更多 -------------------------------------------------------->
    <slot></slot>
    <!-- 顶部 -------------------------------------------------------->
    <card-header
      :userAvatar="userAvatarURL"
      :userId="userId"
      :userName="userName"
      :publishTime="createTime"
      :publishAddress="publishAddress"
      :avatarCardPosition="avatarCardPosition"
      @clickUser="$emit('clickUser')"
    >
      <template #avatarCard>
        <slot name="avatarCard"></slot>
      </template>
    </card-header>
    <!-- show内容 -------------------------------------------------------->
    <card-main
      :content="content"
      :files="files"
      @clickFile="(index:number) => $emit('clickFile',index)"
    >
    </card-main>
    <!-- 点赞，评论等 -------------------------------------------------------->

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import cardHeader from "./components/CardHeader.vue";
import cardMain from "./components/card-main.vue";
import commentOption from "@/components/comment-option/category1.vue";
import commentOption2 from "@/components/comment-option/category2.vue";
import JinnContent from "@/components/jinn-components/jinn-content/jinn-content.vue";
import JinnContentFiles from "@/components/jinn-components/jinn-content/jinn-content-files/jinn-content-files.vue";

const emit = defineEmits<{
  (e: "changeLikeState", active: boolean, func: any): void;
  (e: "comment-handler"): void;
  (e: "changeStarState", active: boolean, func: any): void;
  (e: "clickFile", index: number): void;
  (e: "clickUser"): void;
}>();

// const likeActive = defineModel<boolean>("likeActive", { default: false });
// const starActive = defineModel<boolean>("starActive", { default: false });
// const likeCount = defineModel<number>("likeCount", { default: 0 });
// const commentCount = defineModel<number>("commentCount", { default: 0 });
// const starCount = defineModel<number>("starCount", { default: 0 });
// const shareCount = defineModel<number>("shareCount", { default: 0 });

const props = withDefaults(
  defineProps<{
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
    likeCount: number;
    commentCount: number;
    starCount: number;
    shareCount: number;
    viewCount: number;

    avatarCardPosition?: string;
  }>(),
  {}
);

//#region 右上角更多模块

// const showDisplay = ref(true);

// const removingAnimations = () => {
//   showDisplay.value = false;
// };

// const openShow = ref(false);
// const ShowClass = computed(() => (openShow.value ? "show-display" : ""));
//#endregion
</script>

<style lang="scss" scoped>
.arco-dropdown-option-content {
  font-size: 15px;
}

.JinnCard {
  transform: translateZ(0deg);
  background-color: var(--jinn-color1);
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--el-border-color);
  // max-width: 700px;
  // min-width: 335px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
  // transition: height 0.3s, border 0.04s, margin-bottom 0.3s;

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
}
</style>
