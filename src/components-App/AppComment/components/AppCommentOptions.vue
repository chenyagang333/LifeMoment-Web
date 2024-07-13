<template>
  <el-dropdown
    placement="bottom-end"
    :show-arrow="false"
    :hide-after="10"
    :teleported="false"
    @visible-change="(state:boolean) => show = state"
  >
    <div class="more-option">...</div>
    <template #dropdown v-if="show">
      <el-dropdown-menu>
        <el-dropdown-item v-if="showDelete" @click="$emit('delete')"
          >删除</el-dropdown-item
        >
        <el-dropdown-item v-else>举报</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  showDelete: boolean;
}>();
defineEmits<{
  (e: "delete"): void;
}>();
const show = ref<boolean>(false);
</script>

<style scoped lang="scss">
.more-option {
  width: 24px;
  height: 9px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  font-size: 17px;
  color: var(--jinn-text-color2);
  &:hover {
    color: var(--jinn-text-color1);
  }
}
</style>
