<template>
  <div class="JinnImage">
    <div class="myContainer" ref="myContainer"></div>
    <a-image-preview-group
      infinite
      :closable="false"
      :mask-closable="false"
      :popupContainer="myContainer"
    >
      <a-space align="center">
        <a-image
          v-for="(i, index) in srcList"
          :key="index"
          :src="i"
          width="50"
          height="50"
          fit="cover"
        />
      </a-space>
    </a-image-preview-group>
  </div>
</template>

<script setup lang="ts">
import { FileType } from "@/utils/FileUtils/FileType";
import { ref } from "vue";

defineProps<{
    data:baseType[]
}>();

const myContainer = ref();

type baseType = {
    fileType:FileType,
    firstUrl:string,
    secondUrl:string,
}
const srcList = [
  "http://1.92.79.63:3030/YouShow/Images/2024/5/30/a65750894b02173b02b0ad91683ac68c0fe0798eb3d234b1072b518e6abe133f/IMG_20230808_090237.jpg",
  "http://1.92.79.63:3030/YouShow/Images/2024/5/30/71b4c32b28f761b406d41e4e0aab7b959ed1d88f5cdc74822d294dea457863ac/IMG_20230629_225523.jpg",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
];
const visible = ref(true);
const current = ref(3);
</script>

<style scoped lang="scss">
.JinnImage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
//   background-color: black;
  .myContainer {
    width: 100%;
    height: 85%;
    position: relative;
    overflow: hidden;
    line-height: 400px;
    text-align: center;
  }
}
</style>
