<template>
  <div class="count-down" @click="startCountdown">
    {{ count == 0 ? "发送验证码" : "重新发送" + count + "s" }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  time?: number; // 倒计时事件 默认60秒
}>();

const emit = defineEmits<{
  (e: "send-code", func: any): void;
}>();

const count = ref<number>(0); // 验证码按钮显示
// 获取验证码倒计时
const startCountdown = () => {
  if (count.value == 0) {
    emit("send-code", () => {
      count.value = props.time ?? 60;
      let intervalId = setInterval(() => {
        count.value -= 1;
        if (count.value == 0) {
          clearInterval(intervalId); // 清除定时器
        }
      }, 1000);
    });
  }
};
</script>

<style scoped>
.count-down {
  cursor: default;
}
</style>
