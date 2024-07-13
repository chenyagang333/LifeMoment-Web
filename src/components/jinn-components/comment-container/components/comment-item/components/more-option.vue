<template>
  <el-dropdown placement="bottom-end">
    <div class="more-option">
      <span class="span-btn">···</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="showDelete" @click="$emit('delete-comment')"
          >删除</el-dropdown-item
        >
        <el-dropdown-item v-else>举报</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
const props = defineProps<{
  showDelete?: boolean;
}>();

const emit = defineEmits<{
  (e: "delete-comment"): void;
}>();
</script>

<style lang="scss" scoped>
.more-option {
  position: absolute;
  top: 0;
  right: 25px;
  font-weight: 700;

  .span-btn {
    color: $text-gray;
  }

  &:hover {
    cursor: pointer;

    .span-btn {
      color: black;
    }
  }
}

.more-option-card {
  padding: 7px;
  border: 1px solid $base-gray-border;
  background-color: white;
  border-radius: 5px;

  .arco-dropdown-option {
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
