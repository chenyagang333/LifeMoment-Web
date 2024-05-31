<template>
  <div class="layout1">
    <AppHeader ref="appHeader" :headerUp="headerUp"></AppHeader>
    <div
      class="HeaderBc"
      :class="AppStore.theme === 'light' ? 'HeaderBcLight' : 'HeaderBcDark'"
      ref="headerBc"
    ></div>
    <RouterView></RouterView>
    <div class="footer"></div>
    <div class="bottom"></div>
    <el-backtop :right="30" :bottom="60" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app/app";
import AppHeader from "@/components/App/AppHeader/AppHeader.vue";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量
const AppStore = useAppStore(); //

//#region 路由管理

const route = useRoute();
const router = useRouter();

//#endregion

const headerUp = ref(true);

const appHeader = ref<any>(null);
const headerBc = ref<any>(null);

const observer = new IntersectionObserver(
  (entry: any) => {
    ChangeHeaderStatus(entry);
  },
  {
    root: appHeader.value,
    threshold: 0,
  }
);

const ChangeHeaderStatus = (entry: any) => {
  if (entry[0].isIntersecting) {
    headerUp.value = true;
  } else {
    headerUp.value = false;
  }
};
onMounted(() => {
  observer.observe(headerBc.value);
});
</script>

<style lang="scss" scoped>
.layout1 {
  background-color: var(--jinn-bg3);
  // background-color: #edeff6;
  margin: 0 auto;
  width: 100%;
  min-width: 1100px;
  max-width: 2560px;

  // 媒介查询 // 暂时不做移动端适配
  // @include respond-to("phone") {
  //   min-width: 1100px;
  //   // width: 100%;
  // }
  // @include respond-to("pad") {
  //   min-width: 1100px;
  //   // width: 100%;
  // }
  // @include respond-to("notebook") {
  //   min-width: 1100px;
  //   max-width: 2560px;
  // }
  // @include respond-to("desktop") {
  //   min-width: 1100px;
  //   max-width: 2560px;
  // }
  // @include respond-to("tv") {
  //   min-width: 1100px;
  //   max-width: 2560px;
  // }


  > .header,
  .layout1-footer {
    width: 100%;
    position: fixed;
    z-index: 1000;
  }

  .HeaderBc {
    height: 155px;
    width: 100%;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top -240px; /* 负值表示往上移动 */
  }
  .HeaderBcLight {
    background-image: url("@/assets/home/hope.jpg");
  }
  .HeaderBcDark {
    background-image: url("@/assets/home/123.jpg");
  }

  .layout1-footer {
    bottom: 0;
    height: 20px;
    background-color: #ebebeb;
    justify-content: center;
    display: flex;
    z-index: 1000000;
  }
  .bottom {
    height: 150px;
  }
}
</style>
