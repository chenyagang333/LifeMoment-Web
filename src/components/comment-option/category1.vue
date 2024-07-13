<template>
  <div class="option" :class="optionClass" @click="changeCount">
    <i class="bi" :class="optionBiClass" :style="iconStyle"></i>
    <span class="count" :style="countStyle">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "change-status", active: boolean): void;
}>();

const props = withDefaults(
  defineProps<{
    type: string; // 按钮类型
    size?: number; // 按钮大小
    bottom?: string; // 图标向下偏移量
    count?: number; // 图标向下偏移量
    active?: boolean; // 图标向下偏移量
  }>(),
  {
    count: 0,
    active: false,
  }
);

const iconStyle = computed(() => {
  // 计算icon大小
  return { fontSize: props.size + "px", marginBottom: "-" + props.bottom };
});
const countStyle = computed(() => {
  // 计算count大小
  return { fontSize: props.size ? props.size - 2 + "px" : "" };
});
const optionClass = ref<any>(); // 绑定icon的图形颜色样式
const optionBiClass = computed(() => {
  return props.active ? activeOptions[props.type] : optionsbi[props.type];
}); // 绑定icon的图形颜色样式
const options = {
  heart: "color-heart",
  star: "color-star",
} as any;
const optionsbi = {
  heart: "bi-heart",
  star: "bi-star",
} as any;
const activeOptions = {
  heart: "bi-heart-fill",
  star: "bi-star-fill",
} as any;
const keyExists = optionsbi.hasOwnProperty(props.type);
if (keyExists) {
  optionClass.value = options[props.type];
} else {
  throw Error("输入的属性type值有误");
}

const changeCount = () => {
  emit("change-status", !props.active);
};
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
    user-select: none;
  }
  .bi-heart-fill {
    color: red;
  }

  .bi-star-fill {
    color: orange;
  }
}

.color-heart:hover {
  color: red;
}
.color-star:hover {
  color: orange;
}
</style>
