<template>
  <div class="card-main">
    <JinnImageViewer
      ref="JinnImageViewerRef"
      v-if="showImgView"
      :src-list="urlList"
      :currentIndex="currentIndex"
      @close="showImgView = false"
    ></JinnImageViewer>
    <div class="content" v-html="baseContent"></div>
    <div class="main-files" v-if="files && files.length > 0">
      <!-- <div class="files" v-for="(i, index) in srcList" :key="index">
            <el-image :src="i" fit="cover" />
        </div> -->
      <template v-if="files.length === 1">
        <div class="signal" @click="clickFile(0)">
          <img
            class="signal-image radius-overflow"
            v-if="files[0].type === FileType.image"
            :src="FileIP + files[0].firstURL"
          />
          <div
            class="signal-video radius-overflow"
            v-if="files[0].type === FileType.video"
          >
            <video :src="FileIP + files[0].firstURL" autoplay controls />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="multiple-file" :class="fileNumTypeClass">
          <div
            class="files radius-overflow"
            v-for="(i, index) in files"
            :key="index"
            @click="clickFile(index)"
          >
            <img
              v-if="i.type === FileType.image"
              :src="FileIP + i.firstURL"
              fit="cover"
            />
            <img
              v-if="i.type === FileType.video"
              :src="FileIP + i.secondURL"
              fit="cover"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import { MyFileInfo } from "@/types/Layout1/youshow/youshow";
import { FileType } from "@/utils/FileUtils/FileType";
import { replaceCustomString } from "@/utils/FileUtils/EmotionFile";
import JinnImageViewer from "@/components/jinn-components/jinn-image-viewer/JinnImageViewer.vue";

const app = getCurrentInstance();
const FileIP = app?.appContext.config.globalProperties.$FileIP;

const props = defineProps<{
  content: string;
  files?: MyFileInfo[];
}>();
// 映射文件地址
const urlList: string[] = props.files?.map((m) => FileIP + m.firstURL) ?? [];
// 转换文章内容的表情部分
const baseContent = replaceCustomString(props.content);

const emit = defineEmits<{
  (e: "clickFile", index: number): void;
}>();
// 是否渲染预览图实例
const showImgView = ref<boolean>(false);
// 首次渲染显示的文件
const currentIndex = ref<number>(0);
// 预览图组件实例
const JinnImageViewerRef = ref();

const clickFile = (index: number) => {
  emit("clickFile", index);
  showImgView.value = true;
  // JinnImageViewerRef.value.open();
  currentIndex.value = index;
};

const fileNumTypeClass = computed(() =>
  props.files?.length === 2 || props.files?.length === 4
    ? "num-type-one"
    : "num-type-two"
);
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  padding: 0;
}
.card-main {
  padding: 5px 20px 0 80px;

  .content {
    line-height: 1.5;
    font-size: 15px;
    width: 100%;
    color: var(--jinn-text-color1);
    word-break: break-all;
  }
  .main-files {
    margin: 10px 0;
    .signal {
      .signal-image {
        max-height: 240px;
        max-width: 100%;
        cursor: -webkit-zoom-in;
        cursor: zoom-in;

        &:hover {
          filter: brightness(90%);
          /* 悬停时降低图片亮度，实现遮罩效果 */
        }
      }

      .signal-video {
        height: 300px;
        width: 100%;
        background-color: black;

        video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .multiple-file {
      display: grid;
      .files {
        cursor: -webkit-zoom-in;
        cursor: zoom-in;
        &:hover {
          filter: brightness(90%);
          /* 悬停时降低图片亮度，实现遮罩效果 */
        }
        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .num-type-one {
      grid-template-columns: repeat(2, 1fr);
    }
    .num-type-two {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @mixin getCardStyle($multiple-file-width) {
    @content;
    .main-files {
      $gridGap: 5px;
      .multiple-file {
        width: $multiple-file-width;
        grid-gap: 5px;
      }

      .num-type-one {
        $fileWH: calc(($multiple-file-width - $gridGap) / 2);

        .files {
          width: $fileWH;
          height: $fileWH;
        }
      }
      .num-type-two {
        $fileWH: calc(($multiple-file-width - $gridGap * 2) / 3);
        .files {
          width: $fileWH;
          height: $fileWH;
        }
      }
    }
  }
  // @include getCardStyle(400px) {
  //   padding-left: 80px;
  // }
  // 移动端适配
  @include respond-to("phone") {
    @include getCardStyle(339px) {
      padding-left: 20px;
    }
  }
  @include respond-to("pad") {
    @include getCardStyle(369px) {
      padding-left: 80px;
    }
  }
  @include pc {
    @include getCardStyle(409px) {
      padding-left: 80px;
    }
  }
  // @include respond-to("notebook") {
  //   @include getCardStyle(400px) {
  //     padding-left: 80px;
  //   }
  // }
  // @include respond-to("desktop") {
  //   @include getCardStyle(400px) {
  //     padding-left: 80px;
  //   }
  // }
  // @include respond-to("tv") {
  //   @include getCardStyle(400px) {
  //     padding-left: 80px;
  //   }
  // }
}
</style>
