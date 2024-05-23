<template>
  <JinnSignIn
    :title="`@${userStore?.userData?.userName}，签到成功!`"
    :img1="img"
    :img2="img"
    text="珍惜当下，多一点热爱！"
  >
  </JinnSignIn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user/user";
import img from "@/assets/home-top-0.jpg";
import JinnSignIn from "@/components/jinn-components/jinn-sign-in/JinnSignIn.vue";

const userStore = useUserStore(); // 拿到管理用户信息的仓库

const signFriend = ref<boolean>(false);
</script>

<style scoped lang="scss">

</style>
