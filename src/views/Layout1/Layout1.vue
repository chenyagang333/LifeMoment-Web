<template>
  <div class="layout1">
    <AppHeader id="LifeBusAppHeader" :headerUp="headerUp"></AppHeader>
    <div class="layout-router-view">
      <div
        id="LifeBusAppHeaderBc"
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
    <el-backtop :right="30" :bottom="60" />
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
const store = useAppStore(); //
const { headerUp } = storeToRefs(store);

const AppStore = useAppStore(); //

const route = useRoute();
const router = useRouter();

const ChangeHeaderStatus = (entry: any) => {
  if (entry[0].isIntersecting) {
    AppStore.headerUp = true;
  } else {
    AppStore.headerUp = false;
  }
};

let observer: IntersectionObserver | null = null;

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

const observeElement = () => {
  if (element) {
    observer = CreateIntersectionObserver();
    observer.observe(element);
  }
};

const unobserveElement = () => {
  if (element) {
    observer?.unobserve(element);
  }
};

onMounted(() => {
  element = document.getElementById("LifeBusAppHeaderBc");
  configShowTopImg(route.name as string);
  observeElement();
});
onBeforeUnmount(() => {
  unobserveElement();
});

//#region 路由管理 页面顶部图片展示
const showTopImg = ref<boolean>(true);

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
