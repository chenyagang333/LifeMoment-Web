<template>
  <div class="main-center" v-infinite-scroll="pagingQueryAsync" infinite-scroll-distance="500"
    :infinite-scroll-disabled="pagingQueryDisabled">
    <my-message style="position: fixed" v-model="SuccessInPublication" text="发表成功"></my-message>
    <!-- 发表说说 -->
    <template v-if="userData">
      <publish-show background-color="white" style="margin-bottom: 10px" @publish-handle="publishHandle"></publish-show>
    </template>
    <!-- 新增说说展示 -->
    <div class="new-publish-show">
      <AppCard v-for="(i, index) in newShows" :key="index" :cardData="i" isNewPublish></AppCard>
    </div>
    <!-- 说说展示 -->
    <div class="publish-show">
      <AppCard v-for="(i, index) in shows" :key="index" :cardData="i"></AppCard>
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
import { ElMessage, UploadUserFile } from "element-plus";
import { del, get, post } from "@/api/AHttp/api";
import myMessage from "@/components/message/my-message.vue";
import { GetAddressAsync, GetAddressByYouShowAsync } from "@/api/Commen";
import GetNowData from "@/utils/Time/NowData";
import { afterExecutionAsync } from "@/utils/utils";
import AppCard from "@/components/App/AppCard/AppCard.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { FileType, getFileType } from "@/utils/FileUtils/FileType";
import { getVideoPreview } from '@/utils/FileUtils/VideoFile';
import { MyFileInfo } from '@/types/Layout1/youshow/youshow';
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
    const uploaderRes = await postShowFile(imageFileList)
    if (uploaderRes.code == 200) {
      await postShow(data, uploaderRes.data)
    }
  } else {
    postShow(data)
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
    publishAddress: resAddress,
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
</style>
