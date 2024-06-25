<template>
  <div class="AppSidebarLeft">
    <div class="hot-show">
      <JinnButton
        type="lucency"
        v-for="(i, index) in navData"
        :key="index"
        @click="navClickHandle(index, i)"
        :style="{
          backgroundColor: navIndex === index ? 'var(--jinn-bg5)' : '',
        }"
      >
        <i
          class="bi"
          :class="[navIndex === index ? i.i_ActiveClassName : i.i_className]"
        ></i>
        {{ i.text }}
      </JinnButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import JinnButton from "@/components/jinn-components/jinn-button/JinnButton.vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/user";
import { ElMessage } from "element-plus";
import { goUserPage } from "@/views/Layout1/user/user";

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const route = useRoute();
const router = useRouter();

const navData = [
  {
    text: "首页",
    i_className: "bi-house",
    i_ActiveClassName: "bi-house-fill",
    path: "",
  },
  {
    text: "推荐",
    i_className: "bi-stars",
    i_ActiveClassName: "bi-stars",
    path: "/",
  },
  {
    text: "关注",
    i_className: "bi-person-check",
    i_ActiveClassName: "bi-person-fill-check",
    path: "",
  },
  {
    text: "朋友",
    i_className: "bi-people",
    i_ActiveClassName: "bi-people-fill",
    path: "",
  },
  {
    text: "我的",
    i_className: "bi-person",
    i_ActiveClassName: "bi-person-fill",
    path: `/userself`,
  },
];

const navIndex = ref<number>(-1);
const navClickHandle = (index: number, i: any) => {
  if (["关注", "朋友", "我的"].includes(i.text)) {
    if (!userData.value?.id) {
      ElMessage.info("请先登录");
      return;
    }
    if (i.text == "我的") {
      goUserPage(router, userData.value?.id);
    }
  } else {
    router.push(i.path);
  }
  navIndex.value = index;
};

onMounted(() => {
  updateNavIndex(route.path);
});

const updateNavIndex = (path: string) => {
  const index = navData.findIndex((x) => x.path == path);
  navIndex.value = index;
};

// onBeforeRouteUpdate((to) => {
//   updateNavIndex(to.path);
//   // configShowTopImg(to.name as string);
// });
</script>

<style scoped lang="scss">
.AppSidebarLeft {
  // 媒介查询 // 动端适配
  @include mobile {
    display: none;
  }
  width: 140px;
  > div {
    border-radius: 4px;
    position: sticky;
    top: 75px;
  }
  .hot-show {
    border: 1px solid var(--jinn-border-color1);
    overflow: hidden;
    background-color: var(--jinn-color1);
    padding: 10px;
    > div {
      margin-bottom: 10px;
      font-size: 15.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding-right: 15px;
      .bi {
        font-size: 20px;
      }
    }
    .hots-conn {
      height: 300px;
      text-indent: 2em;
    }
  }
}
</style>
