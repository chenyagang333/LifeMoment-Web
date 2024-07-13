<template>
  <div class="card-header">
    <div class="headerImg">
      <hugs-popover-wrap distance="5" :position="avatarCardPosition ?? 'bc'">
        <el-avatar
          :size="50"
          :src="userAvatar"
          @click="$emit('clickUser')"
        ></el-avatar>
        <template #popover>
          <div class="user-card radius-overflow-border">
            <slot name="avatarCard"></slot>
          </div>
        </template>
      </hugs-popover-wrap>
    </div>
    <div>
      <div class="userName" @click="$emit('clickUser')">{{ userName }}</div>
      <div class="anputInfo">
        <span class="showTime">{{ publishTime }}</span>
        <span class="showIP" v-if="publishAddress">
          发布于 {{ publishAddress }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import { JinnProductionCardHeaderType } from "./card-header";
const props = defineProps<JinnProductionCardHeaderType>();

defineEmits<{
  (e: "clickUser"): void;
}>();
</script>

<style lang="scss" scoped>
.card-header {
  padding: 0 20px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  .headerImg {
    margin-right: 10px;
    position: relative;

    .el-avatar {
      background-image: url("@/assets/default/defaultAvatar.png");
      background-size: cover;
    }
    .user-card {
      background-color: var(--jinn-bg4);
    }
  }

  .userName {
    font-size: 16px;
    font-weight: 500;
    $height: 26px;
    height: $height;
    line-height: $height;
    color: var(--jinn-text-color1);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .anputInfo {
    $height: 26px;
    height: $height;
    line-height: $height;
    font-size: 13px;
    color: var(--jinn-text-color2);
  }
}
</style>
