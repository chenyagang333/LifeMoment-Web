<template>
  <el-popover 
  :placement="placement ?? 'top'"
    :width="327.5"
    trigger="click"
    :hide-after="0"
    ref="popover"
  >
    <template #reference>
      <i class="bi bi-emoji-smile"></i>
    </template>
    <el-scrollbar height="200px"

    >
      <div class="emotion">
        <img
          class=""
          v-for="(i, index) in 105"
          :key="i"
          :src="`/src/assets/emotions/${index}.gif`"
          @click="enterEmotion(index)"
        />
      </div>
      <!-- :src="`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif`" -->
    </el-scrollbar>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  placement?:string
}>()

const popover = ref(null) as any; // 定义 ref.

const emit = defineEmits<{
  (e: "enterEmotion", index: number): void;
}>();

const enterEmotion = (index: number) => {
  console.log('object :>> ', popover.value);
  popover.value.hide();
  emit("enterEmotion", index);
};


</script>

<style lang="scss" scoped>
@import './emotion.scss';
</style>
