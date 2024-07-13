<!-- <template v-if="isVideo">
  <div class="jinn-content-file">
    <i class="bi bi-play-fill"></i>
    <video :src="src" />
  </div>
</template>
<template v-else>
  <el-image class="jinn-content-file" :src="src" fit="cover" lazy> </el-image>
</template> -->
<template>
  <div class="jinn-content-file">
    <template v-if="isVideo">
      <i class="bi bi-play-fill"></i>
      <video :src="src" />
    </template>
    <template v-else>
      <img v-lazy="src" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { FileType, getFileTypeByFileName } from "@/utils/FileUtils/FileType";
const props = withDefaults(
  defineProps<{
    src: string;
  }>(),
  {}
);
const isVideo = getFileTypeByFileName(props.src) === FileType.video; // 是视频
</script>

<style scoped lang="scss">
.jinn-content-file {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  :deep(.el-image__inner) {
    width: auto;
  }
  .bi {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    font-size: 56px;
    z-index: 10;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      display: block;
      color: #f87c45;
      cursor: pointer;
    }
  }
  video,
  // img {
    :deep(img) {
    // img {
    border-radius: var(--el-border-radius-base);
    border: 0.1px solid var(--el-border-color);
    background-color: var(--el-fill-color-light);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    &:hover {
      /* 悬停时降低图片亮度，实现遮罩效果 */
      filter: brightness(90%);
    }
  }
  video {
    position: absolute;
    width: 100%;
    background-color: black;
  }
  :deep(img) {
    // img {
    object-fit: cover;
    cursor: -webkit-zoom-in;
    cursor: zoom-in;
  }
}
</style>
