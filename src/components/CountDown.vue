<template>
  <div class="count-down" @click="startCountdown">
    <template v-if="sendIng">{{ "重新发送" + count + "s" }}</template>
    <template v-else>{{ "发送验证码" }}</template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    time?: number; // 倒计时事件 默认60秒
  }>(),
  {
    time: 60,
  }
);

const emit = defineEmits<{
  (e: "send-code", func: any): void;
}>();

let intervalId: any;

const count = ref<number>(0); // 验证码按钮显示
const sendIng = ref<boolean>(false); //

// 获取验证码倒计时
const startCountdown = () => {
  if (!sendIng.value) {
    emit("send-code", () => {
      if (intervalId) {
        reset();
      } else {
        sendIng.value = true;
        count.value = props.time;
        intervalId = setInterval(() => {
          count.value -= 1;
          if (count.value == 0) {
            reset();
          }
        }, 1000);
      }
    });
  }
};

const reset = () => {
  clearInterval(intervalId); // 清除定时器
  intervalId = null
  sendIng.value = false;
};
</script>

<style scoped>
.count-down {
  cursor: default;
}
</style>
