<template>
  <div class="youshow">
    <div class="center">
      <main-center></main-center>
    </div>
    <AppSidebarRight></AppSidebarRight>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mainCenter from "./main-center/main-center.vue";
import AppSidebarRight from "@/components-App/AppSidebar/AppSidebarRight.vue";

//#region left

//#endregion

// center
</script>

<style lang="scss" scoped>
.youshow {
  display: flex;
  justify-content: center;
  --el-text-color-disabled: white;
  margin-top: 10px;
  @include mobile {
    width: 100%;
  }
  > .center {
    margin: 0 10px;
    width: 760px;
  }

  // 媒介查询 // 动端适配
  @include mobile {
    > .center {
    margin: 0;
    width: 100%;
    }
  }
}
.arco-collapse-item-header {
  color: #eb7350;
}
</style>
