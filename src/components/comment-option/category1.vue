<template>
  <div class="option" :class="optionClass" @click="changeCount">
    <i class="bi" :class="optionbiClass" :style="iconStype"></i>
    <span class="count" :style="countStype">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref, nextTick } from "vue";

const emit = defineEmits<{
  (e: "change-status", active: boolean, func: any): void;
}>();

const count = defineModel<number>("count", { default: 0 });
const active = defineModel<boolean>("active", { default: false });

const props = defineProps<{
  type: string; // 按钮类型
  size?: number; // 按钮大小
  bottom?: string; // 图标向下偏移量
}>();
const iconStype = computed(() => {
  // 计算icon大小
  return { fontSize: props.size + "px", marginBottom: "-" + props.bottom };
});
const countStype = computed(() => {
  // 计算count大小
  return { fontSize: props.size ? props.size - 2 + "px" : "" };
});
const optionClass = ref<any>(); // 绑定icon的图形颜色样式
const optionbiClass = computed(() => {
  return active.value ? activeOptions[props.type] : optionsbi[props.type];
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

const changeCount = async () => {
  //
  toggleCount();
  await nextTick();
  emit("change-status", active.value, toggleCount);
};
const toggleCount = () => {
  // 切换选中状态
  if (active.value) {
    active.value = false;
    count.value -= 1;
  } else {
    active.value = true;
    count.value += 1;
  }
};
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;

  color: var(--jinn-text-c1);
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
