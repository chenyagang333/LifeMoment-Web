<template>
  <el-header>
    <div class="headerImg">
      <el-avatar :size="50" :src="userAvatar"></el-avatar>
    </div>
    <div class="userName">{{ userName }}</div>
    <div class="anputInfo">
      <span class="showTime">{{
        publishTime.substring(0, publishTime.length - 3)
      }}</span>
      <span class="showIP"> 发布于 {{ publishAddress }}</span>
    </div>
  </el-header>
</template>

<script setup lang="ts">
const props = defineProps<{
  userAvatar: string;
  userId: number;
  userName: string;
  publishTime: string;
  publishAddress: string;
}>();
</script>

<style lang="scss" scoped>
.el-header {
  padding-top: 10px;

  .headerImg {
    float: left;
    margin-right: 10px;
    position: relative;
  }

  .userName {
    font-size: 16px;
    font-weight: 500;
    $height: 26px;
    height: $height;
    line-height: $height;
  }

  .anputInfo {
    $height: 26px;
    height: $height;
    line-height: $height;
    font-size: 13px;
    color: #646464;
  }
}
</style>
