<template>
  <div class="AppTabs">
    <el-tabs
      stretch
      v-model="drawerTab"
      :style="{ '--el-color-primary': computedTabColor }"
      style="height: 36px;"
    >
      <el-tab-pane label="TA的作品" name="TA">
        <template #label>
          <span style="color: #ff9800;">TA的作品</span>
        </template>
      </el-tab-pane>
      <el-tab-pane
      label="评论"
      name="comment"
      >
      <template #label>
        <span style="color: #00bcd4;">评论</span>
      </template>
      </el-tab-pane>
    </el-tabs>
    <div class="base-tab-pane" v-show="drawerTab == 'TA'">
      <div class="text-h6">Mails</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <slot name="TA"></slot>
    </div>
    <div class="base-tab-pane" v-show="drawerTab == 'comment'">
      <AppComment
        :showId="showId"
        v-model:comment-count="commentCount"
      ></AppComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import JinnComment from "@/components/jinn-components/jinn-comment/jinn-comment.vue";
import AppComment from "@/components-App/AppComment/AppComment.vue";

const props = defineProps<{
  showId: number;
}>();

const commentCount = defineModel<number>("commentCount", {
  required: true,
  default: 0,
});

const drawerTab = ref("comment");

const computedTabColor = computed(() => {
  return drawerTab.value == "comment" ? "#00bcd4" : "#ff9800";
});
</script>

<style scoped lang="scss">
.AppTabs {
  height: 100%;
  .base-tab-pane {
    padding: 16px;
    height: calc(100% - 36px);
  }
}
</style>
