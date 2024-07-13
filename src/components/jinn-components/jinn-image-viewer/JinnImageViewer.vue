<template>
  <!-- BEGIN 预览效果 -->
  <div v-show="!dialogVideoVisible">
    <el-image-viewer
      ref="ImgSViewRef"
      :url-list="srcList"
      :initial-index="currentIndex"
      hide-on-click-modal
      @close="showImgView = false"
      @switch="switchImg"
    ></el-image-viewer>
  </div>
  <JinnVideoViewer
    v-if="dialogVideoVisible"
    :src="VideoSrc"
    @switchPrev="switchPrev"
    @switchNext="switchNext"
    @close="showImgView = false"
  >
  </JinnVideoViewer>
  <!-- END 预览效果 -->
</template>

<script setup lang="ts">
import useEventListenerPopstate from "@/hooks/useEventListenerPopstate";
import { FileType, getFileTypeByFileName } from "@/utils/FileUtils/FileType";
import { ref, watch } from "vue";
import JinnVideoViewer from "./components/JinnVideoViewer.vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const props = withDefaults(
  defineProps<{
    srcList: string[];
    currentIndex?: number;
  }>(),
  {
    withDefaults: [],
    currentIndex: 0,
  }
);
// 拿到数据后做一个文件类型的映射
const fileTypes = props.srcList.map((x) => getFileTypeByFileName(x));
// 预览图弹窗控制
const { visible: showImgView } = useEventListenerPopstate("showImgView", true);
// 视频弹窗控制
const dialogVideoVisible = ref<boolean>(false);
const VideoSrc = ref<string>("");
// 当前索引值
const currentIndex = ref<number>(props.currentIndex);
// 预览图实例
const ImgSViewRef = ref();
// 切换图片
const switchImg = (index: number) => {
  ImgSViewRef.value?.setActiveItem(index);
  currentIndex.value = index;
  if (fileTypes[index] == FileType.image) {
    dialogVideoVisible.value = false;
  } else if (fileTypes[index] == FileType.video) {
    dialogVideoVisible.value = true;
    VideoSrc.value = props.srcList[currentIndex.value];
  }
};
switchImg(currentIndex.value);
// 切换到上一页
const switchPrev = () => {
  let index = currentIndex.value - 1;
  if (index < 0) {
    index = props.srcList.length - 1;
  }
  switchImg(index);
};
// 切换到下一页
const switchNext = () => {
  let index = currentIndex.value + 1;
  if (index >= props.srcList.length) {
    index = 0;
  }
  switchImg(index);
};

watch(showImgView, (newValue) => {
  // 关闭后通知父组件销毁该组件
  if (!newValue) {
    emit("close");
  }
});

// const open = () => {
//   showImgView.value = true;
// };

// defineExpose({ open });
</script>

<style scoped lang="scss"></style>
