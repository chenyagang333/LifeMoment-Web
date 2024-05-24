<template>
  <div class="option" :class="optionClass" @click="changeCount">
    <i class="bi" :class="optionbiClass" :style="iconStype"></i>
    <span class="count" :style="countStype">{{ countComputed }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

const emit = defineEmits<{
  (e: "change-status", isActive: boolean, func: any): void;
}>();

const props = defineProps<{
  count?: number;
  isActive: boolean;
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
const optionbiClass = ref<any>(); // 绑定icon的图形颜色样式
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
  if (props.isActive) {
    // 如果是激活状态，则icon初始样式为激活的样式
    optionbiClass.value = activeOptions[props.type];
  } else {
    optionbiClass.value = optionsbi[props.type];
  }
  optionClass.value = options[props.type];
} else {
  throw Error("输入的属性type值有误");
}
const countComputed = computed(() => {
  return (
    (props.count ?? 0) +
    (activeRef.value ? (props.isActive ? 0 : 1) : props.isActive ? -1 : 0)
  );
});
const activeRef = ref(props.isActive);
const changeCount = async () => {
  //
  emit("change-status", !activeRef.value, toggleCount);
  toggleCount();
};
const toggleCount = () => {
  // 切换选中状态
  if (activeRef.value) {
    activeRef.value = false;
    optionbiClass.value = optionsbi[props.type];
  } else {
    activeRef.value = true;
    optionbiClass.value = activeOptions[props.type];
  }
};
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;

  color: #5c5c5c;
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
