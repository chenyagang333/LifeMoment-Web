<template>
  <el-header>
    <div class="headerImg">
      <hugs-popover-wrap distance="5">
        <el-avatar :size="50" :src="userAvatar"></el-avatar>
        <template #popover>
          <div class="user-card radius-overflow-border">
            <div class="user-card-header"></div>
          </div>
        </template>
      </hugs-popover-wrap>
    </div>
    <div class="userName">{{ userName }}</div>
    <div class="anputInfo">
      <span class="showTime">{{ publishTime.substring(0, publishTime.length - 3) }}</span>
      <span class="showIP"> 发布于 {{ publishAddress }}</span>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";

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

    .user-card {
      width: 350px;
      height: 280px;
      background-color: white;
      .user-card-header{
        height: 80px;
        background-image: url("@/assets/home/hope.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        // background-position: center top;
        background-position: center top -10px;
        /* 负值表示往上移动 */
      }
    }
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
