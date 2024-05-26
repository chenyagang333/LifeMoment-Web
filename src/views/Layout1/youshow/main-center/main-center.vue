<template>
  <div
    class="main-center"
    v-infinite-scroll="pagingQueryAsync"
    infinite-scroll-distance="500"
    :infinite-scroll-disabled="pagingQueryDisabled"
  >
    <a-modal
      v-model:visible="visibleCardDetail"
      :footer="false"
      hide-title
      @before-close="beforeCloseCardDetail"
      width="75%"
    >
      <div class="detail-core">
        <div class="detail-core-main">
          <AppCard
            style="width: 100%"
            :files="detailData?.files"
            :id="detailData?.id"
            :userAvatarURL="detailData?.userAvatarURL"
            :userId="detailData?.userId"
            :userName="detailData?.userName"
            :createTime="detailData?.createTime"
            :publishAddress="detailData?.publishAddress"
            :content="detailData?.content"
            :likeUsers="detailData?.likeUsers"
            :viewCount="detailData?.viewCount"
            v-model:likeActive="detailData.likeActive"
            v-model:starActive="detailData.starActive"
            v-model:like-count="detailData.likeCount"
            v-model:starCount="detailData.starCount"
            v-model:shareCount="detailData.shareCount"
            v-model:commentCount="detailData.commentCount"
          ></AppCard>
        </div>
        <div class="detail-core-comment">
          <AppTabs
            :showId="detailData?.id"
            v-model:commentCount="detailData.commentCount"
            v-if="visibleCardDetail"
          ></AppTabs>
        </div>
      </div>
    </a-modal>
    <my-message
      style="position: fixed"
      v-model="SuccessInPublication"
      text="发表成功"
    ></my-message>
    <!-- 发表说说 -->
    <template v-if="userData">
      <publish-show
        background-color="white"
        style="margin-bottom: 10px"
        @publish-handle="publishHandle"
      ></publish-show>
    </template>
    <!-- 新增说说展示 -->
    <div class="new-publish-show">
      <AppCard
        v-for="(i, index) in newShows"
        :key="index"
        :files="i.files"
        :id="i.id"
        :userAvatarURL="i.userAvatarURL"
        :userId="i.userId"
        :userName="i.userName"
        :createTime="i.createTime"
        :publishAddress="i.publishAddress"
        :content="i.content"
        :likeUsers="i.likeUsers"
        :viewCount="i.viewCount"
        v-model:likeActive="i.likeActive"
        v-model:starActive="i.starActive"
        v-model:likeCount="i.likeCount"
        v-model:starCount="i.starCount"
        v-model:shareCount="i.shareCount"
        v-model:commentCount="i.commentCount"
        @commentHandler="() => openCardDetailDialog(i, index)"
        isNewPublish
      ></AppCard>
    </div>
    <!-- 说说展示 -->
    <div class="publish-show">
      <AppCard
        v-for="(i, index) in shows"
        :key="index"
        :files="i.files"
        :id="i.id"
        :userAvatarURL="i.userAvatarURL"
        :userId="i.userId"
        :userName="i.userName"
        :createTime="i.createTime"
        :publishAddress="i.publishAddress"
        :content="i.content"
        :likeUsers="i.likeUsers"
        :viewCount="i.viewCount"
        v-model:likeActive="i.likeActive"
        v-model:starActive="i.starActive"
        v-model:likeCount="i.likeCount"
        v-model:starCount="i.starCount"
        v-model:shareCount="i.shareCount"
        v-model:commentCount="i.commentCount"
        @commentHandler="() => openCardDetailDialog(i, index)"
      ></AppCard>
    </div>
    <!-- 加载动画 -->
    <div class="youshow-no-more" v-if="pagingQueryDisabled">
      暂时没有更多说说
    </div>
    <div v-else class="youshow-loading" v-loading="true"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PublishShow from "@/components/comment-add/PublishShow.vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import { del, get, post } from "@/api/AHttp/api";
import myMessage from "@/components/message/my-message.vue";
import { GetAddressAsync, GetAddressByYouShowAsync } from "@/api/Commen";
import GetNowData from "@/utils/Time/NowDate";
import { afterExecutionAsync } from "@/utils/utils";
import AppCard from "@/components/App/AppCard/AppCard.vue";
import AppTabs from "@/components/App/AppTabs/AppTabs.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { FileType, getFileType } from "@/utils/FileUtils/FileType";
import { MyFileInfo } from "@/types/Layout1/youshow/youshow";

const UserStore = useUserStore();
const { userData } = storeToRefs(UserStore);

const dataa = [
  {
    id: 1,
    userAvatarURL:
      "https://picx.zhimg.com/70/v2-55d457ea7d8811496ee9c1055b7a77f8_1440w.avis?source=172ae18b&biz_tag=Post",
    userId: 123,
    userName: "User1",
    publishTime: "2022-01-01 10:00:00",
    publishAddress: "New York",
    content: "This is the first show",
    likeUsers: ["User2", "User3"],
    viewCount: 100,
    likeCount: 2,
    starCount: 5,
    shareCount: 3,
    likeActive: false,
    starActive: true,
    commentCount: 10,
  },
  {
    id: 2,
    userAvatarURL:
      "https://wallpaperm.cmcm.com/4700eaf249b71d56d95aff8ca94313fa.jpg",
    userId: 456,
    userName: "User2",
    publishTime: "2022-02-02 12:00:00",
    publishAddress: "London",
    content: "This is the second show",
    likeUsers: ["User1", "User3"],
    viewCount: 200,
    likeCount: 2,
    starCount: 3,
    shareCount: 1,
    likeActive: true,
    starActive: false,
    commentCount: 5,
  },
];

const shows = ref<ShowType[]>([]);
const newShows = ref<ShowType[]>([]);
const SuccessInPublication = ref<boolean>(false);
const publishHandle = async (content: string, imageFileList: any[]) => {
  const data: ShowType = await getPublishShowData(content);
  console.log("imageFileList :>> ", imageFileList);
  if (imageFileList.length > 0) {
    const uploaderRes = await postShowFile(imageFileList);
    if (uploaderRes.code == 200) {
      await postShow(data, uploaderRes.data);
    }
  } else {
    postShow(data);
  }
};
// 上传图片或视频
const postShowFile = async (imageFileList: any[]) => {
  const formData = new FormData();
  formData.append(`ServiceType`, "0");
  imageFileList.forEach(async (file) => {
    formData.append(`Files`, file.raw);
    if (file.fileType === FileType.video) {
      formData.append(`Files`, file.secondRaw);
    }
  });
  const uploaderRes = await post<any>("Uploader/MultipleUpload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return uploaderRes;
};
// 上传说说内容
const postShow = async (data: ShowType, files?: MyFileInfo[]) => {
  if (files) {
    // data.fileURLList = fileURLList.map(x => "https://localhost:7070/" + x);
    data.files = files;
  }
  const CreateYouShowRes = await post<any>("YouShow/CreateYouShow", data);
  if (CreateYouShowRes.code == 200) {
    data.id = CreateYouShowRes.data;
    newShows.value.push(data);
    // 提示发布成功
    SuccessInPublication.value = true;
  }
};

//#region 获取请求参数

const getPublishShowData = async (content: string) => {
  const resAddress = await GetAddressByYouShowAsync();
  return {
    id: 0,
    userAvatarURL: userData.value?.avatarImageURL!,
    userId: userData.value?.userId!,
    userName: userData.value?.userName!,
    createTime: GetNowData(),
    publishAddress: resAddress ?? "未知",
    content: content,
    commentCount: 0,
    files: [],
  };
};

//#endregion

//#region shows

let pageIndex = 1;
const pagingQueryDisabled = ref(false);
const pagingQueryAsync = afterExecutionAsync(async () => {
  const pageSize = 10;
  const res = await get("YouShow/PagingQuery", { pageSize, pageIndex });
  if (res.code == 200) {
    if (res.data && res.data.length > 0) {
      pageIndex++;
      shows.value.push(...res.data);
      if (res.data.length < pageSize) {
        pagingQueryDisabled.value = true;
      }
    }
  }
});

//#endregion

const visibleCardDetail = ref<boolean>(false); // 查看评论弹窗控制
const detailData = ref<any>({
  likeUsers: null,
  viewCount: 0,
  starCount: 0,
  shareCount: 0,
  commentCount: 0,
  likeActive: false,
  starActive: false,
  files: [],
  userId: 8,
  userName: "大撒大撒",
  userAvatarURL: "",
  publishAddress: "北京市",
  content: '哈哈，<img src="/src/assets/emotions/13.gif">',
  likeCount: 1,
  createTime: "2024-05-24 14:34:07",
  id: 270,
});
const openCardDetailDialog = (data: any, index: number) => {
  detailData.value = data;
  visibleCardDetail.value = true;
};
const beforeCloseCardDetail = () => {};

onMounted(() => {
  pagingQueryAsync();
});
</script>

<style lang="scss" scoped>
.main-center {
  width: 100%;



  // .new-publish-show,publish-show{
  .new-publish-show {
    display: flex;
    flex-direction: column-reverse;
  }

  .youshow-loading,
  .youshow-no-more {
    height: 60px;
    width: 100%;
    background-color: white;
    margin-bottom: 20px;
  }

  .youshow-no-more {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.arco-modal {
  .detail-core {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: calc(100vh - 151px);
    min-height: 650px;
    width: 100%;
    min-width: 345px;
    overflow-y: auto;
    .detail-core-main {
      width: calc(50% - 10px);
      min-width: 335px;
      margin-right: 20px;
      height: 100%;
      overflow-y: auto;
      // 滚动条外观设置
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: var(--jinn-border-color1);
      }
      &::-webkit-scrollbar-thumb {
        background: $base-orange;
        // margin: 2.5px;
        border-radius: 10px;
        // width: 5px;
        // margin: 0 2px;
      }
    }
    .detail-core-comment {
      height: 100%;
      width: calc(50% - 10px);
      min-width: 335px;
      overflow: hidden;
      border: 1px solid var(--jinn-border-color1);
      border-radius: var(--el-border-radius-base);
    }
  }
}
.arco-modal {
  max-width: 1280px;
}
</style>
