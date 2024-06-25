<template>
  <div class="AppSignIn">
    <div class="sign-in">
      <span class="now-time">{{ MonthDate }}</span>
      <el-text class="text" tag="ins" @click="appStore.signInVisible = true"
        >签到</el-text
      >
    </div>
    <div class="publish">
      <div class="label">本月签到次数</div>
      <div class="count">{{ SignInCount }}次</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user/user";
import { get } from "@/api/AHttp/api";
import { useAppStore } from "@/stores/app/app";

const userStore = useUserStore(); // 拿到管理用户信息的仓库
const appStore = useAppStore();


// 签到模块 right
const date = new Date();
const MonthDate = `${date.getMonth() + 1}-${date.getDate()}`;


const SignInCount = ref<number>(0);

const getCountOfSignInForMonth = async () => {
  SignInCount.value = await get("User/GetCountOfSignInForMonth", {
    userId: userStore?.userData?.id,
  });
};

onMounted(async () => {
  await getCountOfSignInForMonth(); // 获取本月签到次数
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
      color: var(--jinn-color2);
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
    color: var(--jinn-color2);
    .label {
      font-size: 14px;
    }
    .count {
      font-size: 17px;
    }
  }
}
</style>
