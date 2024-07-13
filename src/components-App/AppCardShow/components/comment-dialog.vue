<template>
  <el-dialog
    v-model="visibleCardDetail"
    align-center
    :fullscreen="AppStore.isMobile"
    width="90vw"
    :show-close="false"
    destroy-on-close

  >
    <div class="detail-core">
      <div
        class="detail-core-main"
        v-if="AppStore.isMobile ? showCoreMain : true"
      >
        <!-- 说说展开 -->
        <slot></slot>
      </div>
      <!-- 移动端展示 -->
      <el-button
        v-if="AppStore.isMobile"
        class="CardDisplayBtn"
        type="primary"
        text
        bg
        @click="showCoreMain = !showCoreMain"
      >
        {{ showCoreMain ? "收起，去底部评论" : "展开"
        }}<el-icon
          :style="{ transform: showCoreMain ? 'rotate(-180deg)' : '' }"
          style="transition: transform 0.3s"
          ><ArrowDown
        /></el-icon>
      </el-button>
      <div class="detail-core-comment">
        <slot name="commentArea"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app/app";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import { ref } from "vue";

const AppStore = useAppStore(); //

defineProps<{
  detailData: ShowType;
}>();

const visibleCardDetail = defineModel<boolean>("visibleCardDetail", {
  default: false,
});

const showCoreMain = ref<boolean>(false);
</script>

<style scoped lang="scss">
.el-dialog {
  max-width: 1280px;
  .detail-core {
    margin-top: -30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(100vh - 100px);
    min-height: 650px;
    width: calc(100% - 2px);
    // min-width: 855px;
    // overflow-y: auto;
    @include mobile {
      width: calc(100% + 40px);
      margin: -60px -20px;
      height: calc(100vh);
      overflow-x: auto;
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-thumb {
        display: none;
      }
      .CardDisplayBtn {
        width: 100%;
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
      border-radius: var(--el-border-radius-base);
      position: relative;
      // 滚动条外观设置
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: var(--el-border-color);
      }
      &::-webkit-scrollbar-thumb {
        background: $base-orange;
        // margin: 2.5px;
        border-radius: 10px;
        // width: 5px;
        // margin: 0 2px;
      }
      @include mobile {
        .JinnCard {
          margin-bottom: 0;
        }
      }
    }
    .detail-core-comment {
      min-width: 335px;
      overflow: hidden;
      border: 1px solid var(--el-border-color);
      border-radius: var(--el-border-radius-base);
      height: 100%;
      @include mobile {
        height: calc(100% - 32px);
      }
    }
  }
  // 卡片切换到图片预览状态时需要修改的样式
  // .detail-file-type {
  //   .detail-core-main,
  //   .detail-core-comment {
  //     @media (max-width: 1200px) {
  //       width: 100%;
  //     }
  //   }
  //   .detail-core-main {
  //     width: calc(65% - 20px);
  //     // @include mobile {
  //     //   height: 90%;
  //     //   width: 100%;
  //     // }
  //     @media (max-width: 1200px) {
  //       width: 100%;
  //       height: 90%;
  //     }
  //   }
  //   .detail-core-comment {
  //     width: 35%;
  //     @media (max-width: 1200px) {
  //       width: 100%;
  //     }
  //     // @include mobile {
  //     //   width: 100%;
  //     // }
  //   }
  // }
}
</style>
