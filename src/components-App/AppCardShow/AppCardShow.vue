<template>
  <div class="AppCardShow">
    <!-- 作品展示模块 -->
    <div
      class="AppCardShow-Core"
      v-infinite-scroll="loadData"
      infinite-scroll-distance="600"
      :infinite-scroll-disabled="pagingQueryDisabled"
    >
      <!-- 说说展示列表 -->
      <div class="publish-show" :class="newAdd ? 'newAddShow' : ''">
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
          :likeActive="i.likeActive"
          :starActive="i.starActive"
          :likeCount="i.likeCount"
          :starCount="i.starCount"
          :shareCount="i.shareCount"
          :commentCount="i.commentCount"
          @clickUser="goUserPage(router, i.userId)"
          @clickFile="(fileIndex:number) => clickFile(fileIndex,i.files!)"
          @share-handler="shareHandler"
          @comment-handler="commentHandler(i)"
          @changeLikeState="(active: boolean) => changeState(i,0,active)"
          @changeStarState="(active: boolean) => changeState(i,1,active)"
        ></AppCard>
      </div>
      <!-- 列表加载效果 -->
      <load
        v-if="!newAdd"
        :pagingQueryDisabled="pagingQueryDisabled"
        :empty="shows.length == 0"
      ></load>
      <!-- 评论信息弹窗 -->
      <commentDialog
        v-if="visibleCardDetail"
        :detailData="detailData"
        v-model:visibleCardDetail="visibleCardDetail"
      >
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
          :likeActive="detailData.likeActive"
          :starActive="detailData.starActive"
          :like-count="detailData.likeCount"
          :starCount="detailData.starCount"
          :shareCount="detailData.shareCount"
          :commentCount="detailData.commentCount"
          avatarCardPosition="bl"
          @clickUser="goUserPage(router, detailData?.id)"
          @clickFile="(fileIndex:number) => clickFile(fileIndex,detailData?.files!)"
          @share-handler="shareHandler"
          @changeLikeState="(active: boolean) => changeState(detailData,0,active)"
          @changeStarState="(active: boolean) => changeState(detailData,1,active)"
        ></AppCard>
        <template #commentArea>
          <AppTabs
            :showId="detailData?.id"
            v-model:commentCount="detailData.commentCount"
          ></AppTabs
        ></template>
      </commentDialog>
      <!-- 预览图 -->
      <JinnImageViewer
        v-if="showImgView"
        :src-list="urlList"
        :currentIndex="currentIndex"
        @close="showImgView = false"
      ></JinnImageViewer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, watch } from "vue";
import { MyFileInfo, ShowType } from "@/types/Layout1/youshow/youshow";
import AppCard from "@/components-App/AppCard/AppCard.vue";
import JinnImage from "@/components/jinn-components/jinn-image/JinnImage.vue";
import { useRoute, useRouter } from "vue-router";
import useEventListenerPopstate from "@/hooks/useEventListenerPopstate";
import { useAppStore } from "@/stores/app/app";
import { ElMessage } from "element-plus";
import { goUserPage } from "@/views/Layout1/user/user";
import AppTabs from "@/components-App/AppTabs/AppTabs.vue";
import commentDialog from "./components/comment-dialog.vue";
import load from "./components/load.vue";
import { get } from "@/api/AHttp/api";
import JinnImageViewer from "@/components/jinn-components/jinn-image-viewer/JinnImageViewer.vue";

const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;
const AppStore = useAppStore(); //

const route = useRoute();
const router = useRouter();

const props = withDefaults(
  defineProps<{
    pageSize?: number;
    newAdd?: boolean;
  }>(),
  {
    pageSize: 10,
    newAdd: false,
  }
);

const emit = defineEmits<{
  (
    e: "loadData",
    pageIndex: number,
    queryAsync: (data: ShowType[]) => void
  ): void;
}>();

//#region 数据展示列表

const shows = ref<ShowType[]>([]);
let pageIndex = 1;
const pagingQueryDisabled = ref(props.newAdd);
const loadDataIng = ref<boolean>(false);
// afterExecutionAsync(async
// 滚动条加载数据函数
const loadData = () => {
  if (!loadDataIng.value) {
    loadDataIng.value = true;
    emit("loadData", pageIndex, (data: ShowType[]) => addData(data));
  }
};
// 新增作品添加数据
const newAddData = (data: ShowType | ShowType[]) => {
  if (Array.isArray(data)) {
    addData(data);
  } else {
    addData([data]);
  }
};
const addData = async (data: ShowType[]) => {
  if (data && data.length > 0) {
    pageIndex++;
    shows.value.push(...data);
    // 该组件默认每次加载十条数据，小于十条视为最后一页
    if (data.length < props.pageSize) {
      pagingQueryDisabled.value = true;
    }
  } else {
    pagingQueryDisabled.value = true;
  }
  loadDataIng.value = false;
};

const clear = () => {
  pageIndex = 1;
  shows.value = [];
};

// 暴露新增数据的方法
defineExpose({ newAddData, clear });

onMounted(() => {
  if (!props.newAdd) loadData();
});

//#endregion

//#region 评论弹窗模块

const { visible: visibleCardDetail } =
  useEventListenerPopstate("visibleCardDetail");
const detailData = ref<ShowType>({
  likeUsers: [],
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
  content: "哈哈",
  likeCount: 1,
  createTime: "2024-05-24 14:34:07",
  id: 270,
});


//#endregion

//#region 列表卡片绑定事件模块

// typei 0代表点赞，1代表收藏

// 点击某个文件
const clickFile = (index: number, files: MyFileInfo[]) => {
  currentIndex.value = index;
  urlList.value = files.map((x) => FileIP + x.firstURL);
  showImgView.value = true;
};
// 分享
const shareHandler = () => {};
// 评论
const commentHandler = async (data?: ShowType) => {
  if (data) {
    detailData.value = data; // 赋值
    await nextTick();
    visibleCardDetail.value = true; // 打开评论弹窗
  }
};
// 更新点赞或收藏 0 代表点赞，1代表收藏
const changeState = async (data: ShowType, typeI: number, active: boolean) => {
  // 构建请求地址
  const buildURL = () => {
    let url = "YouShow/"; // 完整的URL为 YouShow/LikeShow ,取消点赞为 YouShow/CancelLikeShow
    if (!active) url += "Cancel";
    const types = ["LikeShow", "StarShow"];
    url += types[typeI];
    return url;
  };
  // 更新状态
  const updateState = () => {
    if (typeI == 0) {
      data.likeActive = active;
      data.likeCount += active ? 1 : -1;
    }else if(typeI == 1){
      data.starActive = active;
      data.starCount += active ? 1 : -1;
    }
  };
  // 重置状态
  const resetState = () => {
    if (typeI == 0) {
      data.likeActive = !active;
      data.likeCount += !active ? 1 : -1;
    }else if(typeI == 1){
      data.starActive = !active;
      data.starCount += !active ? 1 : -1;
    }
  };
  const url = buildURL(); // 构建地址
  try {
    updateState(); // 更新状态
    const res = await get(url, { youshowId: data.id });
    if (res.code == 200) {
    } else {
      resetState(); // 请求失败，重置状态
      ElMessage(res.message);
    }
  } catch {
    resetState(); // 请求失败，重置状态
  }
};

//#endregion

//#region 文件预览图模块

// 是否渲染预览图实例
const showImgView = ref<boolean>(false);
// 首次渲染显示的文件
const currentIndex = ref<number>(0);
// 预览图 list
const urlList = ref<string[]>([]);

//#endregion
</script>

<style scoped lang="scss">
// :deep(.el-dialog__body){padding: 0}
.AppCardShow {
  // width: 650px;
  width: 100%;

  .newAddShow {
    display: flex;
    flex-direction: column-reverse;
  }
  .AppCardShow-Core {
    .el-card {
      width: 100%;
      background-color: var(--jinn-color1);
      border: 1px solid var(--el-border-color);
    }
    // --el-mask-color: var(--jinn-color1);
  }
}
</style>
