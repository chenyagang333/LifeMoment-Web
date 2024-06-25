<template>
  <div class="main-center">
    <!-- <AppHeaderChannel></AppHeaderChannel> -->
    <my-message
      style="position: fixed"
      v-model="SuccessInPublication"
      text="发表成功"
    ></my-message>
    <!-- 发表说说 -->
    <template v-if="userData">
      <publish-show
        style="margin-bottom: 10px"
        @publish-handle="publishHandle"
      ></publish-show>
    </template>
    <!-- 新增说说展示 -->
    <AppCardShow ref="AppCardShowOfNewAdd" newAdd></AppCardShow>
    <!-- 说说展示 -->
    <AppCardShow @load-data="loadDataHandle"></AppCardShow>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import PublishShow from "@/components/comment-add/PublishShow.vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import { ApiResult, del, get, post } from "@/api/AHttp/api";
import myMessage from "@/components/message/my-message.vue";
import { GetAddressAsync, GetAddressByYouShowAsync } from "@/api/Commen";
import GetNowData from "@/utils/Time/NowDate";
import AppCardShow from "@/components-App/AppCard/AppCardShow.vue";
import AppHeaderChannel from "@/components-App/AppHeaderChannel/AppHeaderChannel.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { FileType, getFileType } from "@/utils/FileUtils/FileType";
import { MyFileInfo } from "@/types/Layout1/youshow/youshow";
import { UploadImage, UploadVideo } from "@/api/modules/upload";

const UserStore = useUserStore();
const { userData } = storeToRefs(UserStore);

const AppCardShowOfNewAdd = ref();

const newShows = ref<ShowType[]>([]);
const SuccessInPublication = ref<boolean>(false);
const publishHandle = async (
  content: string,
  imageFileList: any[],
  submit: () => Promise<void>
) => {
  const data: ShowType = await getPublishShowData(content);
  console.log("imageFileList :>> ", imageFileList);
  if (imageFileList.length > 0) {
    const list = await postShowFile(imageFileList);
    await postShow(data, list);
  } else {
    await postShow(data);
  }
  submit(); // 文件上传完成后删除本地临时文件
};
const postShowFile = async (imageFileList: any[]): Promise<MyFileInfo[]> => {
  let promises: Promise<any>[] = [];
  let list: MyFileInfo[] = [];
  imageFileList.forEach((file) => promises.push(uploadFile(file)));
  return Promise.all(promises)
    .then((responses) => {
      // 处理每个异步请求的返回值
      responses.forEach((response: ApiResult<MyFileInfo>, index) => {
        if (response.code === 200) {
          response.data.sort = index;
          list.push(response.data);
        }
      });
      return list;
    })
    .catch((error) => {
      // 处理错误
      return list;
    });
};
// 上传单个图片或视频
const uploadFile = (file: any): Promise<any> => {
  const formData = new FormData();
  formData.append(`ServiceType`, "0"); //
  if (file.fileType === FileType.video) {
    formData.append(`Files`, file.raw);
    // 如果是视频文件添加封面图
    formData.append(`Files`, file.secondRaw);
    // 返回上传单个文件的Promise对象
    return UploadVideo(formData);
  }
  formData.append(`File`, file.raw);
  // 返回上传单个文件的Promise对象
  return UploadImage(formData);
};
// 上传图片或视频
// 上传说说内容
const postShow = async (data: ShowType, files?: MyFileInfo[]) => {
  if (files) {
    // data.fileURLList = fileURLList.map(x => "https://localhost:7070/" + x);
    data.files = files.sort((x) => x.sort);
  }
  const CreateYouShowRes = await post<any>("YouShow/CreateYouShow", data);
  if (CreateYouShowRes.code == 200) {
    data.id = CreateYouShowRes.data;
    // newShows.value.push(data);
    AppCardShowOfNewAdd.value.newAddData(data);
    // 提示发布成功
    SuccessInPublication.value = true;
  }
};

//#region 获取请求参数

const getPublishShowData = async (content: string) => {
  const resAddress = await GetAddressByYouShowAsync();
  return {
    id: 0,
    userAvatarURL: userData.value?.userAvatar!,
    userId: userData.value?.id!,
    userName: userData.value?.userName!,
    createTime: GetNowData(),
    publishAddress: resAddress ?? "未知",
    content: content,
    commentCount: 0,
    files: [],
    likeUsers: [""],
    viewCount: 0,
    likeCount: 0,
    starCount: 0,
    shareCount: 0,
    likeActive: false,
    starActive: false,
  };
};

//#endregion

//#region shows

const loadDataHandle = async (
  pageIndex: number,
  query: (data: ShowType[]) => void
) => {
  const res = await get("YouShow/PagingQuery", { pageSize: 10, pageIndex });
  if (res.code == 200) {
    query(res.data);
  }
};

//#endregion

// #region

// #endregion
</script>

<style lang="scss" scoped>
.main-center {
  width: 100%;
}
</style>
