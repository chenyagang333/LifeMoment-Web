<template>
  <div class="youshow">
    <div class="left">
      <div class="hot-show">
        <q-card>
          <q-tabs
            v-model="leftTab"
            narrow-indicator
            indicator-color="red"
            class="bg-grey-1"
            dense
            align="justify"
          >
            <q-tab name="hots" label="热门" />
            <q-tab name="inform" label="公告栏" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="leftTab" animated>
            <q-tab-panel name="hots">
              <div class="hots-conn"></div>
            </q-tab-panel>

            <q-tab-panel name="inform"> </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <div class="center">
      <main-center></main-center>
    </div>
    <div class="right">
      <div class="user-relevant radius-overflow">
        <AppSignIn></AppSignIn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mainCenter from "./main-center/main-center.vue";
import AppSignIn from "@/components/App/AppSignIn/AppSignIn.vue";

const visible = ref(true);
const current = ref(3);

//#region left

const leftTab = ref("hots");

//#endregion

// center
const links = [
  "推荐",
  "生活",
  "旅行",
  "知识",
  "美食",
  "学习",
  "影像",
  "游戏",
  "健康",
  "工作",
];
</script>

<style lang="scss" scoped>
.youshow {
  display: flex;
  justify-content: center;
  --el-text-color-disabled: white;
  margin-top: 10px;
  width: 100%;
  > .left,
  > .right {
    width: 230px;
    > div {
      border-radius: 4px;
      position: sticky;
      top: 75px;
      // border: 1px solid rgb(235, 235, 235);
      // box-shadow: 0 0 5px rgb(212, 212, 212);
    }
  }

  > .left {
    .hot-show {
      border: 1px solid var(--el-border-color-light);
      overflow: hidden;
      .hots-conn {
        height: 300px;
        text-indent: 2em;
      }
    }
  }

  > .center {
    margin: 0 10px;
    width: 650px;
  }
  > .right {
    .user-relevant {
      height: 600px;
      // background-color: var(--el-border-color-light);
      border: 1px solid var(--jinn-border-color1);
    }
  }
  // 媒介查询 // 暂时不做移动端适配
  // @include respond-to("phone") {
  //   > .center {
  //     width: 100%;
  //   }
  //   > .left,
  //   > .right {
  //     display: none;
  //   }
  // }
  // @include respond-to("pad") {
  //   > .center {
  //     width: 100%;
  //   }
  //   > .left,
  //   > .right {
  //     display: none;
  //   }
  // }
  // @include respond-to("notebook") {
  //   > .center {
  //     width: 650px;
  //   }
  // }
  // @include respond-to("desktop") {
  //   > .center {
  //     width: 650px;
  //   }
  // }
  // @include respond-to("tv") {
  //   > .center {
  //     width: 650px;
  //   }
  // }
}
.arco-collapse-item-header {
  color: #eb7350;
}
</style>
