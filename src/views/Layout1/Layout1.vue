<template>
  <div class="layout1">
    <AppHeader ref="appHeader" :headerUp="headerUp"></AppHeader>
    <div class="header-bc" ref="headerBc"></div>
    <AppHeaderChannel></AppHeaderChannel>
    <RouterView></RouterView>
    <div class="footer"></div>
    <div class="bottom"></div>
    <el-backtop :right="50" :bottom="50" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { Moon, Sunny } from "@element-plus/icons-vue";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import SignBox from "@/components/SignBox.vue";
import headerImg from "@/assets/defaultHead.png";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/utils";
import { setToken, removeToken } from "@/utils/token.ts";
import { ElMessage } from "element-plus";
import AppHeader from "@/components/App/AppHeader/AppHeader.vue";
import AppHeaderChannel from "@/components/App/AppHeaderChannel/AppHeaderChannel.vue";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

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
  background-color: $base-gray;
  // background-color: #edeff6;
  max-width: 2560px;
  min-width: 1100px;
  width: 100%;
  // min-height: 100vh;
  // min-height: 1000px;
  margin: 0 auto;
  // margin-left: 50%;
  // transform: translateX(-50%);  
  > .header,
  .layout1-footer {
    width: 100%;
    max-width: 2560px;
    position: fixed;
    z-index: 1000;
  }

  .header-bc {
    min-width: 1100px;
    // max-width: 2560px;
    // height: 160px;
    height: 200px;
    // height: 64px;
    height: 155px;

    width: 100%;
    background-color: #ffffff;
    // background-image: url("@/assets/home/home-top-0.jpg");
    background-image: url("@/assets/home/hope.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top -240px; /* 负值表示往上移动 */
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
