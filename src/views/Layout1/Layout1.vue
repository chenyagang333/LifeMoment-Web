<template>
  <div class="layout1">
    <AppHeader :headerUp="headerUp"></AppHeader>
    <div class="layout-router-view">
      <div
        id="LifeMomentAppHeaderBc"
        class="HeaderBc"
        :class="AppStore.theme === 'light' ? 'HeaderBcLight' : 'HeaderBcDark'"
        :style="{ height: showTopImg ? '' : '0px' }"
      ></div>
      <div class="AppRouterViewContent">
        <AppSidebarLeft
          style="width: 140px"
          :class="showTopImg ? 'AppSidebarLeft1' : 'AppSidebarLeft2'"
        ></AppSidebarLeft>
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
          <!-- <transition name="fade">
            </transition> -->
        </RouterView>
      </div>
    </div>
    <div class="footer"></div>
    <div class="bottom"></div>
    <!-- 返回顶部导航 -->
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1989fa;
        "
      >
        <el-icon><Top /></el-icon>
      </div>
    </el-backtop>
    <!-- 用户签到组件 -->
    <AppSignInDialog></AppSignInDialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import AppHeader from "@/components-App/AppHeader/AppHeader.vue";
import { useAppStore } from "@/stores/app/app";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeUnmount, ref } from "vue";
import AppSidebarLeft from "@/components-App/AppSidebar/AppSidebarLeft.vue";
import AppSignInDialog from "@/components-App/AppSignIn/AppSignInDialog.vue";
import { useDebounceFn } from "@vueuse/core";
import ddddasdas from "./ddd.vue";
const store = useAppStore(); //
const AppStore = useAppStore(); //
const { headerUp } = storeToRefs(store);

const route = useRoute();
const router = useRouter();

//#region 页面顶部图片展示

// 切换顶部导航栏样式
const ChangeHeaderStatus = (entry: any) => {
  if (entry[0].isIntersecting) {
    AppStore.headerUp = true;
  } else {
    AppStore.headerUp = false;
  }
};

let observer: IntersectionObserver | null = null;

// 创建监听器
const CreateIntersectionObserver = () => {
  return new IntersectionObserver(
    (entry: any) => {
      ChangeHeaderStatus(entry);
    },
    {
      root: null,
      threshold: 0.5,
    }
  );
};

let element: HTMLElement | null;

// 监听DOM
const observeElement = () => {
  if (element) {
    observer = CreateIntersectionObserver();
    observer.observe(element);
  }
};
// 移除监听
const unobserveElement = () => {
  if (element) {
    observer?.unobserve(element);
  }
};

onMounted(() => {
  element = document.getElementById("LifeMomentAppHeaderBc");
  configShowTopImg(route.name as string);
  observeElement();
});
onBeforeUnmount(() => {
  unobserveElement();
});

const showTopImg = ref<boolean>(true);

// 配置站点顶部背景
const configShowTopImg = (name: string) => {
  if (["User", "UserSelf"].includes(name)) {
    if (showTopImg.value) {
      showTopImg.value = false;
    }
  } else {
    if (!showTopImg.value) {
      showTopImg.value = true;
    }
  }
};

onBeforeRouteUpdate((to) => {
  configShowTopImg(to.name as string);
});

//#endregion

//#region 监听窗口宽度

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  // 在这里规定 宽度小于 769 视为移动端设备 // 和媒介查询宽度设置一致
  if (!AppStore.isMobile && screenWidth.value < 769) AppStore.isMobile = true;
  if (AppStore.isMobile && screenWidth.value > 768) AppStore.isMobile = false;
}, 100);
listeningWindow();
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});

//#endregion 监听窗口宽度
</script>

<style lang="scss" scoped>
.fade-enter-active {
  // 设置子路由过渡动画
  // transition: all 0.3s ease-out;
}

.fade-leave-to {
  // 设置子路由过渡动画
  // opacity: 1;
  // transform: translateX(0);
}
.fade-enter-from {
  // 设置子路由过渡动画
  // opacity: 0;
  // transform: translateX(60px);
}

.layout1 {
  background-color: var(--jinn-bg3);
  transition: all 0.3s ease-in-out;
  // background-color: #edeff6;
  margin: 0 auto;
  min-width: var(--jinn-min-width);
  max-width: 2560px;
  position: relative;
  // 媒介查询 // 动端适配
  @include mobile {
    min-width: 0;
  }
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

  .layout-router-view {
    .HeaderBc {
      height: 155px;
      width: 100%;
      background-color: #ffffff;
      background-repeat: no-repeat;
      background-size: cover;
      // background-position: center top -240px; /* 负值表示往上移动 */
      background-position: center; /* 负值表示往上移动 */
      overflow: hidden;
      // transition: height 0.3s ease-in-out;
      position: relative;
    }
    .AppRouterViewContent {
      display: flex;
      justify-content: center;
      .AppSidebarLeft1 {
        margin-top: 10px;
      }
      .AppSidebarLeft2 {
        margin: 100px 10px 0 0;
      }
    }
    .HeaderBcLight {
      background-image: url("@/assets/home/hope.jpg");
    }
    .HeaderBcDark {
      background-image: url("@/assets/home/123.jpg");
    }
    @media (min-height: 788px) {
      min-height: calc(100vh - 140px);
    }
    @media (max-height: 787px) {
      min-height: 683px;
    }
  }

  > .header,
  .layout1-footer {
    width: 100%;
    position: fixed;
    z-index: 1000;
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
    background-color: var(--jinn-bg6);
  }
}
</style>
