<template>
  <UserCore v-if="userId" :userId="userId"></UserCore>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import UserCore from "./UserCore.vue";

const route = useRoute();
const userId: number = Number(route.query.userId);
</script>

<style scoped lang="scss">

</style>
