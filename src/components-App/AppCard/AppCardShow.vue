<template>
  <div class="AppCardShow">
    <!-- 评论信息弹窗 -->
    <a-modal
      v-model:visible="visibleCardDetail"
      :footer="false"
      hide-title
      width="auto"
    >
      <div class="detail-core" :class="showFile ? 'detail-file-type' : ''">
        <div class="detail-core-main">
          <template v-if="visibleCardDetail">
            <AppCard
              v-if="!showFile"
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
              avatarCardPosition="bl"
              @clickFile="(index:number) => changeCardDetailDialog(true,undefined,index)"
            ></AppCard>
            <JinnImage
              v-if="showFile"
              :data="detailData.files"
              :defaultCurrent="defaultCurrent"
              @visible-change="(state:boolean) => changeCardDetailDialog(state,undefined)"
            ></JinnImage>
          </template>
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
    <div
      class="AppCardShow-Core"
      v-infinite-scroll="loadData"
      infinite-scroll-distance="600"
      :infinite-scroll-disabled="pagingQueryDisabled"
    >
      <!-- 说说展示 -->
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
          v-model:likeActive="i.likeActive"
          v-model:starActive="i.starActive"
          v-model:likeCount="i.likeCount"
          v-model:starCount="i.starCount"
          v-model:shareCount="i.shareCount"
          v-model:commentCount="i.commentCount"
          @commentHandler="() => changeCardDetailDialog(false, i)"
          @clickFile="(index:number) => changeCardDetailDialog(true,i,index)"
        ></AppCard>
      </div>
      <template v-if="!newAdd">
        <template v-if="pagingQueryDisabled">
          <AppEmpty v-if="shows.length == 0"></AppEmpty>
          <el-card class="youshow-no-more" shadow="never" v-else>
            暂时没有更多说说
          </el-card>
        </template>
        <!-- 加载动画 -->
        <template v-else>
          <el-card
            style="margin-bottom: 10px"
            shadow="never"
            v-for="i in 3"
            :key="i"
          >
            <el-skeleton
              style="
                --el-skeleton-circle-size: 55px;
                background-color: var(--jinn-color1);
              "
              animated
            >
              <template #template>
                <div style="display: flex; justify-content: space-between">
                  <el-skeleton-item variant="circle" />
                  <el-skeleton style="width: calc(100% - 65px)" />
                </div>
              </template>
            </el-skeleton>
            <br />
          </el-card>
          <el-card class="youshow-loading" shadow="never" v-loading="true">
          </el-card>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import AppCard from "@/components-App/AppCard/AppCard.vue";
import AppTabs from "@/components-App/AppTabs/AppTabs.vue";
import JinnImage from "@/components/jinn-components/jinn-image/JinnImage.vue";
import AppEmpty from "@/components-App/AppEmpty/AppEmpty.vue";
import { useRoute, useRouter } from "vue-router";
import useEventListenerPopstate from "@/hooks/useEventListenerPopstate";

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

const { visible: visibleCardDetail } = useEventListenerPopstate();
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

const showFile = ref<boolean>(true);
const defaultCurrent = ref<number>(0);

const changeCardDetailDialog = (
  _showFile: boolean,
  data?: ShowType,
  _defaultCurrent: number = 0
) => {
  showFile.value = _showFile;
  defaultCurrent.value = _defaultCurrent;
  if (data) {
    detailData.value = data;
    visibleCardDetail.value = true;
  }
};
</script>

<style scoped lang="scss">
.arco-modal {
  max-width: 1280px;
  .detail-core {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(100vh - 100px);
    min-height: 650px;
    width: calc(90vw - 40px);
    // min-width: 855px;
    // overflow-y: auto;
    @include mobile {
      width: calc(100vw - 40px);
      height: calc(100vh - 48px);
      overflow-x: auto;
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-thumb {
        display: none;
      }
    }
    .detail-core-main,
    .detail-core-comment {
      transition: width 0.3s ease;
      width: calc(50% - 10px);
      @media (max-width: 1200px) {
        width: 100%;
      }
      @include mobile {
        width: 100%;
      }
    }
    .detail-core-main {
      // display: none;
      min-width: 335px;
      // margin-right: 20px;
      overflow-y: auto;
      border-radius: var(--jinn-border-radius);
      position: relative;
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
      min-width: 335px;
      overflow: hidden;
      border: 1px solid var(--jinn-border-color1);
      border-radius: var(--el-border-radius-base);
      height: 100%;
    }
  }
  // 卡片切换到图片预览状态时需要修改的样式
  .detail-file-type {
    .detail-core-main,
    .detail-core-comment {
      @media (max-width: 1200px) {
        width: 100%;
      }
    }
    .detail-core-main {
      width: calc(65% - 20px);
      // @include mobile {
      //   height: 90%;
      //   width: 100%;
      // }
      @media (max-width: 1200px) {
        width: 100%;
        height: 90%;
      }
    }
    .detail-core-comment {
      width: 35%;
      @media (max-width: 1200px) {
        width: 100%;
      }
      // @include mobile {
      //   width: 100%;
      // }
    }
  }
}
.AppCardShow {
  // width: 650px;
  width: 100%;
  .youshow-no-more {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .youshow-loading {
    padding: 10px 0;
  }
  .newAddShow {
    display: flex;
    flex-direction: column-reverse;
  }
  .AppCardShow-Core {
    .el-card {
      width: 100%;
      background-color: var(--jinn-color1);
      border: 1px solid var(--jinn-border-color1);
    }
    --el-mask-color: var(--jinn-color1);
  }
}
</style>
