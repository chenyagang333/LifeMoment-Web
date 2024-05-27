<template>
  <JinnSignIn
    :title="`@${userStore?.userData?.userName}，签到成功!`"
    :img1="img1"
    :img2="img2"
    text="珍惜当下，多一点热爱！"
    :SignInNum="2564898"
    :rollingOver="rollingOver"
    @SignIn="SignInHandle"
    style="width: 100%"
  >
    <template #friend>
      <JinnSignInFriend :data="friendData" :num="33"></JinnSignInFriend>
    </template>
  </JinnSignIn>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user/user";
import img1 from "@/assets/home-top-0.jpg";
import img2 from "@/assets/home/OIP-C.jpg";
import JinnSignIn from "@/components/jinn-components/jinn-sign-in/JinnSignIn.vue";
import JinnSignInFriend from "@/components/jinn-components/jinn-sign-in/JinnSignInFriend.vue";
import { get } from "@/api/AHttp/api";
import { ElMessage } from "element-plus";

const userStore = useUserStore(); // 拿到管理用户信息的仓库

const rollingOver = ref<boolean>(false);

const SignInHandle = async () => {
  const res = await get("User/SignIn", { userId: userStore?.userData?.userId });
  if (res.code === 200) {
    rollingOver.value = true;
  } else {
    ElMessage.error(res.message);
  }
};

const getSignInState = async () => {
  const state = await get("User/GetSignInState", {
    userId: userStore?.userData?.userId,
  });
  if (state) rollingOver.value = true;
};
const friendData = [
  {
    img: "http://1.92.79.63:3030/YouShow/Images/2024/3/29/0e0047bc4893be6342b8352729cb2b1bce325853c6bccca207306399e9c4d1de/6bd777d82ca76ce5fd08c8c2cb23e3a.jpg",
    href: "none",
  },
  {
    img: "http://1.92.79.63:3030/YouShow/Images/2024/3/29/0e0047bc4893be6342b8352729cb2b1bce325853c6bccca207306399e9c4d1de/6bd777d82ca76ce5fd08c8c2cb23e3a.jpg",
    href: "none",
  },
];

onMounted(() => {
  getSignInState();
});
</script>

<style scoped lang="scss"></style>
