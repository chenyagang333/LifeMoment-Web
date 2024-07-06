<template>
  <div class="AppSidebarRight">
    <div class="sticky">
      <div class="user-relevant radius-overflow">
        <AppSignIn v-if="login"></AppSignIn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSignIn from "@/components-App/AppSignIn/AppSignIn.vue";
import useLoginState from "@/hooks/useLoginState";

const login = useLoginState();
</script>

<style scoped lang="scss">
.AppSidebarRight {
  // 媒介查询 // 动端适配
  @include mobile {
    display: none;
  }
  width: 230px;
  > div {
    border-radius: 4px;
    position: sticky;
    top: 75px;
  }
  .user-relevant {
    height: 600px;
    border: 1px solid var(--el-border-color);
  }
}
</style>
