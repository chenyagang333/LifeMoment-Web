<template>
  <a-dropdown position="br" trigger="hover">
    <div class="more-option">
      <span class="span-btn">···</span>
    </div>
    <template #content>
      <a-doption v-if="userId == userData?.userId" @click="$emit('delete-comment')"
        >删除</a-doption
      >
      <a-doption v-else>举报</a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = defineProps<{
  id: number;
  userId: number;
  isReply?: boolean;
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
