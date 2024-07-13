<template>
  <div class="option" :class="optionClass">
    <i class="bi" :class="optionBiClass" :style="{ fontSize: size + 'px' }"></i>
    <span class="count" :style="{ fontSize: size ? size - 2 + 'px' : '' }">{{
      text ?? count ?? 0
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    type: string;
    size?: number;
    text?: string;
    count?: number;
  }>(),
  {
    count: 0,
  }
);

const optionBiClass = ref<any>({});
const optionClass = ref<any>({});

const optionsBi = {
  chat: "bi-chat-dots",
  share: "bi-box-arrow-up-right",
} as any;
const options = {
  chat: "chat-color",
  share: "share-color",
} as any;
const keyExists = optionsBi.hasOwnProperty(props.type);
if (keyExists) {
  optionBiClass.value = optionsBi[props.type];
  optionClass.value = options[props.type];
} else {
  throw Error("输入的属性type值有误");
}
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  cursor: pointer;

  color: var(--jinn-text-color1);
  .bi {
    font-size: 20px;
  }

  .count {
    font-size: 15px;
    margin-left: 5px;
  }
}
.chat-color:hover {
  color: pink;
}
.share-color:hover {
  color: skyblue;
}
</style>
