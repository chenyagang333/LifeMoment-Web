<template>
  <UserCore v-if="userData?.id" :userId="userData?.id"></UserCore>
</template>

<script setup lang="ts">
import UserCore from "./UserCore.vue";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

</script>

<style scoped lang="scss">

</style>
