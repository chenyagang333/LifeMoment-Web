<template>
  <div class="card-right">
    <!-- <el-icon class="pack-up" @click="openShow = false">
            <Back />
        </el-icon> -->
    <!-- 顶部 -->
    <!-- <right-header
      :userAvatar="userAvatarURL"
      :userId="userId"
      :userName="userName"
      :publishTime="createTime"
      :publishAddress="publishAddress"
    ></right-header> -->
    <!-- show内容 -->
    <!-- <div v-html="content"></div> -->
    <!-- 点赞，评论等 -->
    <!-- <card-footer
      :showId="id"
      :commentCount="commentCount"
      :likeCount="likeCount"
      :starCount="starCount"
      :shareCount="shareCount"
      :viewCount="viewCount"
      :likeUsers="likeUsers"
      :likeActive="likeActive"
      :starActive="starActive"
      @comment-handler="drawer = true"
    ></card-footer> -->
    <div class="tabs">
      <q-tabs v-model="drawerTab" class="bg-grey-1" dense align="justify">
        <q-tab class="text-orange" name="TA" label="TA的作品" />
        <q-tab class="text-cyan" name="comment" label="评论" />
        <!-- <q-tab class="text-red" name="movies" label="Movies" /> -->
      </q-tabs>
      <q-tabs calss="tab-pack-up" class="bg-grey-1" narrow-indicator>
        <q-tab class="text-red" icon="arrow_back" @click="openShow = false" />
      </q-tabs>
    </div>
    <q-tab-panels keep-alive v-model="drawerTab" animated>
      <!-- 他的作品 -->
      <q-tab-panel name="TA">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <slot name="TA"></slot>
      </q-tab-panel>
      <!-- ----------------------------评论区----------------------------- -->
      <q-tab-panel name="comment">
        <slot name="comment"></slot>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, computed, ref, reactive } from "vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import rightHeader from "./right-header.vue";
import cardFooter from "@/views/Layout1/youshow/youshow-main/main-center/show-card/card-footer.vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = defineProps<{
  cardData: ShowType;
}>();
const {
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

const drawer = ref(false);
const drawerInit = ref(false);
const drawerTab = ref("comment");

//#region 抽屉初始化

//#endregion

const openShow = defineModel("openShow");
</script>

<style lang="scss" scoped>
.q-tab-panels {
  padding: 0;
  height: calc(100% - 35px);
  width: 100%;
}
.q-tab-panel {
  padding-top: 10px;
}

.card-right {
  position: absolute;
  top: -1px;
  left: calc(100% + 1px);
  // background-color: red;
  transition: all 0.3s;
  border-radius: 0 4px 4px 0;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  width: 450px;
  border: 1px solid var(--el-border-color-light);
  border-left: 0;

  .pack-up {
    position: absolute;
    top: 7.5px;
    right: 7.5px;
    font-size: 20px;
    color: $text-gray;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: $base-gray;

    &:hover {
      color: $base-orange;
      background-color: rgb(255, 242, 218);
    }
  }

  .tabs {
    display: flex;

    .q-tabs {
      width: calc(100% - 75px);
      height: 45px;
    }

    .q-tabs:last-child {
      width: 75px;
    }

    // .tab-pack-up {
    //     width: 50px;
    //     height: 45px;
    // }
  }
}
</style>
