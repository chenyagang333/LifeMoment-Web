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
      <div class="user-relevant"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mainCenter from "./main-center/main-center.vue";

//#region left

const leftTab = ref("hots");

//#endregion
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
    width: 280px;
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
    width: 650px;
    // width: 38.5%;
    margin: 0 10px;
  }
  > .right {
    .user-relevant {
      height: 600px;
      width: 300px;
      background-color: var(--el-border-color-light);
    }
  }
}
.arco-collapse-item-header {
  color: #eb7350;
}
</style>
