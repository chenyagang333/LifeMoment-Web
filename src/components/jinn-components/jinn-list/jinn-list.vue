<template>
  <div class="jinn-list" :class="columnReverse ? 'columnReverse' : ''">
    <div
      class="jinn-list-item"
      v-for="(item, index) in dataSource"
      :key="index"
      ref="itemRefs"
    >
      <slot name="renderItem" :item="item" :index="index" :itemRef="itemRefs[index]"></slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Object ">
import { ref } from "vue";

defineProps<{
  dataSource: any[];
  columnReverse?: boolean;
}>();
const itemRefs = ref([]);
</script>

<style scoped>
.jinn-list {
  display: flex;
  flex-direction: column;
}
.columnReverse {
  flex-direction: column-reverse;
}
</style>
