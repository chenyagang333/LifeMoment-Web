<template>
  <div class="jinn-list" :class="columnReverse ? 'columnReverse' : ''">
    <div
      class="jinn-list-item"
      v-for="(item, index) in dataSource"
      :key="index"
    >
      <slot name="renderItem" :item="item" :index="index"></slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Object ">
defineProps<{
  dataSource: any[];
  columnReverse?: boolean;
}>();
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
