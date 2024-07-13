<template>
  <!-- 签到弹窗------------------------------------------------------------------- -->
  <el-dialog
    v-model="appStore.signInVisible"
    align-center
    width="366"
    :show-close="false"
    :fullscreen="appStore.isMobile"
  >
    <JinnSignIn
      :title="`@${userStore?.userData?.userName}，签到成功!`"
      :img1="img1"
      :img2="img2"
      text="珍惜当下，多一点热爱！"
      :SignInNum="2564898"
      :rollingOver="rollingOver"
      @SignIn="SignInHandle"
      style="width: 100%; margin-top: -40px; margin-bottom: -10px"
      :style="{ height: appStore.isMobile ? 'calc(100vh - 40px)' : '560px' }"
    >
      <template #friend>
        <JinnSignInFriend :data="friendData" :num="33"></JinnSignInFriend>
      </template>
    </JinnSignIn>
  </el-dialog>
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
import { useAppStore } from "@/stores/app/app";

const userStore = useUserStore(); // 拿到管理用户信息的仓库
const appStore = useAppStore();

const rollingOver = ref<boolean>(false);

const SignInHandle = async () => {
  const res = await get("User/SignIn", { userId: userStore?.userData?.id });
  if (res.code === 200) {
    rollingOver.value = true;
  } else {
    ElMessage.error(res.message);
  }
};

const getSignInState = async () => {
  const state = await get("User/GetSignInState", {
    userId: userStore?.userData?.id,
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

// 签到模块 right

onMounted(() => {
  if (appStore.signInVisible) {
    getSignInState(); // 获取签到状态
  }
});
</script>
<style scoped lang="scss">
.AppSignIn {
  height: 70px;
  display: flex;
  justify-content: space-between;
  .sign-in,
  .publish {
    height: 100%;
  }
  .sign-in {
    background-color: var(--jinn-bg2);
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .now-time {
      color: var(--jinn-text-color1);
    }
    .text {
      cursor: pointer;
      font-size: 17px;
      color: var(--jinn-color5);
    }
  }
  .publish {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    background-color: var(--jinn-color1);
    color: var(--jinn-text-color1);
    .label {
      font-size: 14px;
    }
    .count {
      font-size: 17px;
    }
  }
}
</style>
