<template>
  <div class="global-search">
    <div class="global-search-header">
      <a-tabs type="line" size="large" v-model:active-key="tabsKey">
        <a-tab-pane key="LifeBus" title="WeStrength - 动态"> </a-tab-pane>
        <a-tab-pane key="User" title="WeStrength - 用户"> </a-tab-pane>
      </a-tabs>
    </div>
    <div class="global-search-pane">
      <template v-if="showSearchData">
        <div class="search-data">
          <LifeBus v-if="tabsKey === 'LifeBus'"></LifeBus>
          <User v-if="tabsKey === 'User'"></User>
        </div>
        <RelevantSearchList></RelevantSearchList>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import LifeBus from "./children/LifeBus.vue";
import User from "./children/User.vue";
import RelevantSearchList from "./children/RelevantSearchList.vue";

const router = useRouter();

const showSearchData = ref<boolean>(true);

const tabsKey = ref<string>("LifeBus");

// 搜索框参数刷新后重新搜索
onBeforeRouteUpdate((to) => {
  reloadData();
});

const reloadData = async () => {
  showSearchData.value = false;
  await nextTick();
  showSearchData.value = true;
};
</script>

<style scoped lang="scss">
.global-search {
  // min-width: var(--jinn-min-width);
  // margin: 0 auto;
  margin-left: 10px;
  margin-top: 10px;
  width: 1130px;
  @include mobile {
    width: 100%;
  }

  .global-search-header {
    background-color: var(--jinn-bg4);
    transition: all 0.3s ease-in-out;
  }
  .global-search-pane {
    background-color: var(--jinn-bg3);
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .search-data {
      width: calc(100% - 270px);
      @include mobile {
        width: 100%;
      }
    }
  }
}
</style>
