<template>
  <div class="JinnDescription" v-if="content">
    <div
      class="content ellipsis"
      ref="BriefIntroductionContent"
      :style="{ color: color ?? 'var(--el-text-color-regular)' }"
    >
      {{ content }}
    </div>
    <a-trigger v-if="showMoreContent" :popup-translate="[-80, 5]">
      <div class="more">更多</div>
      <template #content>
        <div
          style="
            width: 230px;
            background-color: var(--jinn-bg3);
            color: var(--el-text-color-primary);
            padding: 10px;
            font-size: 13px;
            border-radius: var(--el-border-radius-base);
            border: 1px solid var(--jinn-color3);
          "
        >
          {{ content }}
        </div>
      </template>
    </a-trigger>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

defineProps<{
  content?: string;
  color?: string;
}>();

const BriefIntroductionContent = ref();
const showMoreContent = computed<boolean>(() => {
  if (BriefIntroductionContent.value) {
    return (
      BriefIntroductionContent.value.scrollWidth >
      BriefIntroductionContent.value.clientWidth
    );
  } else {
    return false;
  }
});
</script>

<style scoped lang="scss">
.JinnDescription {
  font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
    sans-serif;
  padding-right: 20px;
  display: flex;
  align-items: center;
  font-size: 12px;
  > .content {
    color: var(--el-text-color-regular);
    width: calc(100% - 26px);
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .more {
    font-size: 13px;
    color: var(--jinn-text-color1);
    cursor: pointer;
  }
}
</style>
