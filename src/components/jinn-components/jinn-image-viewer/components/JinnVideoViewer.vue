<template>
  <div class="dialogVideo">
    <el-button
      class="btnClose"
      size="large"
      type="primary"
      text
      bg
      icon="Close"
      circle
      @click="$emit('close')"
    >
    </el-button>
    <el-button
      class="btnLeft"
      size="large"
      type="primary"
      text
      bg
      icon="ArrowLeft"
      circle
      @click="$emit('switchPrev')"
    >
    </el-button>
    <el-button
      class="btnRight"
      size="large"
      type="primary"
      text
      bg
      icon="ArrowRight"
      circle
      @click="$emit('switchNext')"
    >
    </el-button>
    <video :src="src" autoplay controls></video>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "switchPrev"): void;
  (e: "switchNext"): void;
}>();
</script>

<style scoped lang="scss">
.dialogVideo {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  // background-color: var(--jinn-bg2);
  background-color: rgba(0,0,0,0.5);
  .btnClose,
  .btnLeft,
  .btnRight {
    position: absolute;
    cursor: pointer;
    z-index: 10;
  }
  $btnBorder: 60px;
  .btnClose {
    top: $btnBorder;
    right: $btnBorder;
    width: 45px;
    height: 45px;
  }
  .btnLeft,
  .btnRight {
    width: 40px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
  .btnLeft {
    left: $btnBorder;
  }
  .btnRight {
    right: $btnBorder;
  }
  > video {
    // width: 100%;
    height: 100%;
    width: 100%;
  }
}
</style>
