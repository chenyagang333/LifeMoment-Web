<template>
  <template v-if="showDisplay">
    <div class="show" :class="ShowClass" ref="showRef">
      <!-- 更多 -->
      <card-option
        :showId="id"
        :userId="userId"
        @deleteMyShow="() => removingAnimations()"
      ></card-option>
      <Transition name="card-main">
        <div v-if="!openShow || (openShow && !haveFile)">
          <!-- 顶部 -->
          <card-header
            :userAvatar="userAvatarURL"
            :userId="userId"
            :userName="userName"
            :publishTime="createTime"
            :publishAddress="publishAddress"
          ></card-header>
          <!-- show内容 -->
          <card-main :content="content" :files="files">
          </card-main>
          <!-- 点赞，评论等 -->
          <card-footer
            :showId="id"
            :commentCount="commentCount"
            :likeCount="likeCount"
            :starCount="starCount"
            :shareCount="shareCount"
            :viewCount="viewCount"
            :likeUsers="likeUsers"
            :likeActive="likeActive"
            :starActive="starActive"
            @comment-handler="InitDrawer"
          ></card-footer>
        </div>
      </Transition>
      <Transition name="card-bottom">
        <card-right v-if="openShow && !haveFile" v-model:openShow="openShow">
          <template #TA>
            <div>个人信息</div>
          </template>
          <template #comment>
            <my-comment
              :showId="id"
              v-model:commentCount="commentCount"
            ></my-comment>
          </template>
        </card-right>
      </Transition>
      <Transition name="card-right">
        <card-right v-if="openShow && haveFile" v-model:openShow="openShow" :cardData="cardData">
          <template #TA>
            <div>个人信息</div>
          </template>
          <template #comment>
            <my-comment
              :showId="id"
              v-model:commentCount="commentCount"
            ></my-comment>
          </template>
        </card-right>
      </Transition>
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

const showRef = ref();

const emit = defineEmits<{
  // (e: "deleteMyShow", id: number): void;
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

//#region 抽屉模块

const InitDrawer = async () => {
  openShow.value = true;
  // showRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const offset =
    showRef.value.getBoundingClientRect().top + window.scrollY - 60;
  // 调用 scrollTo() 方法使其滚动到指定位置
  await nextTick();
  window.scrollTo({ top: offset, behavior: "smooth" });
};

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

.card-main-enter-active,
.card-main-leave-active {
  transition: all 0.2s ease;
}

.card-main-enter-from,
.card-main-leave-to {
  opacity: 0;
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
