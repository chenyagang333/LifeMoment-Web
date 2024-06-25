<template>
  <JinnCard
    @changeLikeState="(active:boolean,func:any) => changeState(active,0, func)"
    @changeStarState="(active:boolean,func:any) => changeState(active,1, func)"
    @commentHandler="() => $emit('comment-handler')"
    @clickFile="(index:number) => $emit('clickFile',index)"
    :files="files"
    :id="id"
    :userAvatarURL="FileIP + userAvatarURL"
    :userId="userId"
    :userName="userName"
    :createTime="createTime?.substring(0, createTime.length - 3)"
    :publishAddress="publishAddress"
    :content="content"
    :likeUsers="likeUsers"
    :viewCount="viewCount"
    v-model:likeActive="likeActive"
    v-model:starActive="starActive"
    v-model:likeCount="likeCount"
    v-model:starCount="starCount"
    v-model:shareCount="shareCount"
    v-model:commentCount="commentCount"
    :avatarCardPosition="avatarCardPosition"
    @clickUser="goUserPage(router, userId)"
  >
    <template #avatarCard>
      <div class="user-card">
        <div class="user-card-header"></div>
        <AppCardUser style="padding: 13px" :userId="userId"></AppCardUser>
      </div>
    </template>
  </JinnCard>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import { ElMessage } from "element-plus";
import AppCardUser from "@/components-App/AppCard/AppCardUser.vue";

import JinnCard from "@/components/jinn-components/jinn-card/JinnCard.vue";
import { get } from "@/api/AHttp/api";

import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { goUserPage } from "@/views/Layout1/user/user";
const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;

const emit = defineEmits<{
  (e: "comment-handler"): void;
  (e: "clickFile", index: number): void;
}>();

const router = useRouter();

const likeActive = defineModel<boolean>("likeActive", { default: false });
const starActive = defineModel<boolean>("starActive", { default: false });
const likeCount = defineModel<number>("likeCount", { default: 0 });
const commentCount = defineModel<number>("commentCount", { default: 0 });
const starCount = defineModel<number>("starCount", { default: 0 });
const shareCount = defineModel<number>("shareCount", { default: 0 });

const props = defineProps<{
  isNewPublish?: boolean;

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

  avatarCardPosition?: string;
}>();

// typei 0代表点赞，1代表收藏
const changeState = async (active: boolean, typei: number, fun: any) => {
  let url = "YouShow/"; // 完整的URL为 YouShow/LikeShow ,取消点赞为 YouShow/CancelLikeShow
  if (!active) url += "Cancel";
  const types = ["LikeShow", "StarShow"];
  url += types[typei];
  try {
    const res = await get(url, { youshowId: props.id });
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

<style scoped lang="scss">
.user-card {
  @include mobile {
    display: none;
  }
  width: 379px;
  .user-card-header {
    // height: 280px;
    height: 80px;
    background-image: url("@/assets/home/hope.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    // background-position: center top;
    background-position: center top -10px;
    /* 负值表示往上移动 */
  }
}
</style>
