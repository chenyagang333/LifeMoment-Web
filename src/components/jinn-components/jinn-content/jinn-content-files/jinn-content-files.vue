<template>
  <div class="jinn-content-files" :class="filesClass">
    <file
      v-for="(url, index) in urls"
      :key="index"
      :src="url"
      @click="$emit('clickFile', index)"
    ></file>
  </div>
</template>

<script setup lang="ts">
import { FileType, getFileTypeByFileName } from "@/utils/FileUtils/FileType";
import file from "./jinn-content-file.vue";

const emit = defineEmits<{
  (e: "clickFile", index: number): void;
}>();

const props = defineProps<{
  urls: string[];
}>();
const filesClass: string[] = []; // 文件类型
const urlLength = props.urls?.length;
const updateFileClass = () => {
  if (urlLength === 1) {
    const isVideo = getFileTypeByFileName(props.urls[0]) === FileType.video; // 根据文件名获取类型
    if (isVideo) {
      filesClass.push("signalVideoUnit");
    } else {
      filesClass.push("signalImgUnit");
    }
  } else if (urlLength === 2 || urlLength === 4) {
    filesClass.push("TheSecondType");
  } else {
    filesClass.push("TheThirdType");
  }
};
updateFileClass();
</script>

<style scoped lang="scss">
.jinn-content-files {
  margin-top: 5px;
}
.signalImgUnit {
  .jinn-content-file {
    width: 100%;
    height: 235px;
  }
}
.signalVideoUnit {
  .jinn-content-file {
    height: 305px;
    width: calc(100% - 20px);
  }
}

.TheSecondType,
.TheThirdType {
  display: grid;
  gap: 4px;
  > .jinn-content-file {
    padding-top: 100%;
    width: 100%;
    :deep(img) {
      width: 100%;
    }
  }
}
.TheSecondType {
  width: 70%;
  grid-template-columns: repeat(2, 1fr);
}
.TheThirdType {
  width: 90%;
  grid-template-columns: repeat(3, 1fr);
}
</style>
