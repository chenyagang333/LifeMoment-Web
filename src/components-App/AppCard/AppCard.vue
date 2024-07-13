<template>
  <ProductionCard
    :userAvatar="_userAvatar"
    :userId="userId"
    :userName="userName"
    :publishTime="_publishTime"
    :publishAddress="publishAddress"
    :content="_content"
    :urls="_urls"
    :likeUsers="likeUsers"
    :viewCount="viewCount"
    :likeActive="likeActive"
    :starActive="starActive"
    :likeCount="likeCount"
    :starCount="starCount"
    :shareCount="shareCount"
    :commentCount="commentCount"
    :avatarCardPosition="avatarCardPosition"
    @changeLikeState="(active:boolean) => $emit('changeLikeState',active)"
    @changeStarState="(active:boolean) => $emit('changeStarState',active)"
    @commentHandler="() => $emit('comment-handler')"
    @shareHandler="() => $emit('share-handler')"
    @clickFile="(index:number) => $emit('clickFile',index)"
    @clickUser="() => $emit('clickUser')"
  >
    <template #avatarCard>
      <div class="user-card">
        <div class="user-card-header"></div>
        <AppCardUser style="padding: 13px" :userId="userId"></AppCardUser>
      </div>
    </template>
  </ProductionCard>
</template>

<script setup lang="ts">
import { MyFileInfo } from "@/types/Layout1/youshow/youshow";
import AppCardUser from "@/components-App/AppCard/AppCardUser.vue";
import ProductionCard from "@/components/jinn-components/jinn-production-card/jinn-production-card.vue";
import { getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { replaceCustomString } from "@/utils/FileUtils/EmotionFile";

const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;
const router = useRouter();

const emit = defineEmits<{
  (e: "clickUser"): void;
  (e: "clickFile", index: number): void;
  (e: "share-handler"): void;
  (e: "comment-handler"): void;
  (e: "changeLikeState", active: boolean): void;
  (e: "changeStarState", active: boolean): void;
}>();

const props = defineProps<{
  content: string;
  files?: MyFileInfo[];
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
}>();

// 对服务端数据进行处理
const _userAvatar = FileIP + props.userAvatarURL;
const _publishTime = props.createTime?.substring(
  0,
  props.createTime.length - 3
);
// 转换文章内容的表情部分
const _content = replaceCustomString(props.content);
const _urls = props.files?.map((x) => FileIP + x.firstURL);
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
