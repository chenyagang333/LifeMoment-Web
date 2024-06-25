<template>
  <div
    id="LifeBusAppHeader"
    class="appHeader"
    :class="headerUp ? 'AppHeaderUp' : 'AppHeaderDown'"
  >
    <div class="content">
      <div class="left">
        <SignBox
          :logoSrc="chat"
          :color="headerUp ? 'white' : 'rgb(203 233 234)'"
          @click="visibleAboutWeb = true"
          ><div class="WebName">&nbsp;LifeBus</div>
        </SignBox>
        <!-- <Navigate :headerUp="headerUp"></Navigate> -->
      </div>
      <SearchBar></SearchBar>
      <div class="right">
        <RightEntry :headerUp="headerUp"></RightEntry>
        <RightEntryMobile :headerUp="headerUp"></RightEntryMobile>
      </div>
    </div>
    <!-- 关于网站 -->
    <a-modal v-model:visible="visibleAboutWeb">
      <template #title>
        <span style="font-size: 16px"> LifeBus </span>
      </template>
      <div class="inform-conn">
        <span>
          如果你站在童年的位置展望未来，你会说你前途未卜，你会说你前途无量，但是你要站在终点看你生命的轨迹，你看到的只有一条路，你就只能看到一条命运之路。
        </span>
        <span>
          不知道命运是什么，才知道什么是命运，所以很多人口中说着看不到未来，其实是看到了未来。
          人生唯一确定的就是不确定的人生，所以大胆去做你想做的事，活在当下，抓住周围一切的美好。
        </span>
      </div>
      <template #footer> —— 史铁生 </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import SignBox from "@/components/SignBox.vue";
import chat from "@/assets/chat.svg";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/utils";
import { setToken, removeToken } from "@/utils/token.ts";
import { ElMessage } from "element-plus";
import LoginDialog from "@/views/LoginDialog.vue";
import Navigate from "./Navigate.vue";
import RightEntry from "./RightEntry/RightEntry.vue";
import RightEntryMobile from "./RightEntry/RightEntryMobile.vue";
import SearchBar from "./SearchBar.vue";

defineProps<{
  headerUp: boolean;
}>();

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

//#region 路由管理

const route = useRoute();
const router = useRouter();

//#endregion

//#region 语言管理
const lang = "Layout1."; // 基本参数管理

//#endregion

const visibleAboutWeb = ref(false);
</script>

<style lang="scss" scoped>
.appHeader {
  // min-width: var(--jinn-min-width);
  @include mobile {
    min-width: 0;
  }
  transition: background 0.1s ease-in-out;
  position: sticky;
  top: 0;
  height: 64px;
  margin-bottom: -64px;
  z-index: 2;
  width: 100%;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: height 0.3s;
    position: relative;
    // 页面导航
    @media (max-width: 1450px) {
      > .left {
        .WebName {
          display: none;
        }
      }
    }
    > .left {
      display: flex;
      align-items: center;
      margin-left: 30px;
      @include mobile {
        margin-left: 0;
        .sign {
          padding: 10px;
        }
      }
      // width: calc(50% - 200px);
    }
    > .right {
      // width: calc(50% - 200px);
    }
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    content: "";
  }
}
.AppHeaderUp {
  &::after {
    background: linear-gradient(
      to bottom,
      rgb(0, 0, 0, 0.1),
      rgb(0, 0, 0, 0.05),
      rgb(0, 0, 0, 0)
    );
  }
}
.AppHeaderDown {
  border-bottom: 1px solid var(--jinn-border-color1);
  &::after {
    backdrop-filter: saturate(180%) blur(20px);
    background-color: var(--jinn-bg1);
  }
}
.arco-modal {
  .inform-conn {
    // height: 500px;
    font-size: 14.5px;
    color: #545454;
    > span {
      display: block;
      text-indent: 2em;
    }
  }
}
</style>
