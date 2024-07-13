<template>
  <div class="JinnImage">
    <div class="myContainer">
      <div
        class="myContainer-img"
        v-show="visibleFileType === FileType.image"
        ref="myContainerImg"
      ></div>
      <video
        v-show="visibleFileType === FileType.video"
        :src="videoSrc"
        autoplay
        controls
      ></video>
      <div class="close" @click="$emit('visible-change', false)">
        <el-icon size="30"><CloseBold /></el-icon>
      </div>
    </div>
    <el-image
      style="width: 100px; height: 100px"
      :src="'url'"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="dataMap"
      :initial-index="currentIndex"
      fit="cover"
    />
    <a-image-preview-group
      :src-list="dataMap"
      infinite
      :closable="false"
      :mask-closable="false"
      :popupContainer="myContainerImg"
      v-model:current="currentIndex"
      @change="changeFile"
      default-visible
    >
      <!-- 文件底部导航栏 -->
      <a-space align="center">
        <template v-for="(i, index) in data" :key="index">
          <img
            style="width: 50px; height: 50px; object-fit: cover"
            :src="
              FileIP +
              (i.type == FileType.image
                ? i.firstURL
                : i.type == FileType.video
                ? i.secondURL
                : '')
            "
            @click="changeFile(index)"
          />
        </template>
      </a-space>
    </a-image-preview-group>
  </div>
</template>

<script setup lang="ts">
import { MyFileInfo } from "@/types/Layout1/youshow/youshow";
import { FileType } from "@/utils/FileUtils/FileType";
import { getCurrentInstance, ref, computed, onMounted } from "vue";

const app = getCurrentInstance();
const FileIP = app?.appContext.config.globalProperties.$FileIP;

const props = defineProps<{
  data?: MyFileInfo[];
  defaultCurrent: number;
}>();
const currentIndex = ref<number>(props.defaultCurrent);

const dataMap = props.data?.map((e) => FileIP + e.firstURL);

defineEmits<{
  (e: "visible-change", state: boolean): void;
}>();

const myContainerImg = ref();

const visibleFileType = ref<FileType>(FileType.image);

const videoSrc = ref<string>("");

const changeFile = (i: number = 0) => {
  currentIndex.value = i;
  if (props.data && props.data.length > 0) {
    visibleFileType.value = props.data![i].type;
    if (props.data![i].type === FileType.video) {
      videoSrc.value = FileIP + props.data![i]?.firstURL;
    }
  }
};

onMounted(() => {
  changeFile(props.defaultCurrent);
});
</script>

<style scoped lang="scss">
.JinnImage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;
  .myContainer {
    width: 100%;
    height: 85%;
    position: relative;
    background-color: black;
    .myContainer-img {
      width: 100%;
      height: 100%;
      position: relative;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 30px;
      height: 30px;
      border-radius: var(--el-border-radius-base);
      background-color: var(--jinn-bg1);
    }
  }
}
</style>
