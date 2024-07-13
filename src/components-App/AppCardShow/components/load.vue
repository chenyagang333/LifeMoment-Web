<template>
  <template v-if="pagingQueryDisabled">
    <AppEmpty v-if="empty"></AppEmpty>
    <el-card v-else class="youshow-no-more" shadow="never">
      暂时没有更多说说
    </el-card>
  </template>
  <!-- 加载动画 -->
  <template v-else>
    <el-card style="margin-bottom: 10px" shadow="never" v-for="i in 3" :key="i">
      <el-skeleton
        style="
          --el-skeleton-circle-size: 55px;
          background-color: var(--jinn-color1);
        "
        animated
      >
        <template #template>
          <div style="display: flex; justify-content: space-between">
            <el-skeleton-item variant="circle" />
            <el-skeleton style="width: calc(100% - 65px)" />
          </div>
        </template>
      </el-skeleton>
      <br />
    </el-card>
    <el-card class="youshow-loading" shadow="never" v-loading="true"> </el-card>
  </template>
</template>

<script setup lang="ts">
import AppEmpty from "@/components-App/AppEmpty/AppEmpty.vue";
defineProps<{
  pagingQueryDisabled: boolean;
  empty: boolean;
}>();
</script>

<style scoped>
.youshow-no-more {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.youshow-loading {
  padding: 10px 0;
}
</style>
