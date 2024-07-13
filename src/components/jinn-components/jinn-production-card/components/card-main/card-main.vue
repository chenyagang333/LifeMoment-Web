<template>
  <div class="card-main">
    <JinnContent v-if="content" :content="content"></JinnContent>
    <JinnContentFiles
      v-if="urls && urls.length > 0"
      :urls="urls"
      @clickFile="(index:number) => $emit('clickFile', index)"
    ></JinnContentFiles>
  </div>
</template>

<script setup lang="ts">
import JinnContent from "@/components/jinn-components/jinn-content/jinn-content.vue";
import JinnContentFiles from "@/components/jinn-components/jinn-content/jinn-content-files/jinn-content-files.vue";
import { JinnProductionCardMainType } from "./card-main";

defineProps<JinnProductionCardMainType>();

defineEmits<{
  (e: "clickFile", index: number): void;
}>();
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  padding: 0;
}
.card-main {
  padding: 5px 20px 0 80px;

  // @mixin getCardStyle($multiple-file-width) {
  //   @content;
  // }
  // @include getCardStyle(400px) {
  //   padding-left: 80px;
  // }
  // 移动端适配
  // @include respond-to("phone") {
  //   padding-left: 20px;
  // }
  // @include respond-to("pad") {
  //   padding-left: 80px;
  // }
  @include mobile {
    padding-left: 20px;
  }
  @include pc {
    padding-left: 80px;
  }
}
</style>
