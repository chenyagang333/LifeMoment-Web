<template>
  <div class="global-search">
    <div class="global-search-header">
      <el-tabs v-model="tabsKey" class="demo-tabs">
        <el-tab-pane
          label="&nbsp;&nbsp;&nbsp;LifeMoment - 动态&nbsp;&nbsp;&nbsp;"
          name="LifeMoment"
        ></el-tab-pane>
        <el-tab-pane
          label="&nbsp;&nbsp;&nbsp;LifeMoment - 用户&nbsp;&nbsp;&nbsp;"
          name="User"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="global-search-pane">
      <template v-if="showSearchData">
        <div class="search-data">
          <LifeMoment v-if="tabsKey === 'LifeMoment'"></LifeMoment>
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
import LifeMoment from "./children/LifeMoment.vue";
import User from "./children/User.vue";
import RelevantSearchList from "./children/RelevantSearchList.vue";

const router = useRouter();
const route = useRoute();

const showSearchData = ref<boolean>(true);

const tabsKey = ref<string>("LifeMoment");

let oldKeyword = "";
// 搜索框参数刷新后重新搜索
onBeforeRouteUpdate((to) => {
  if (to.query.keyword != oldKeyword) {
    // 关键词更新才刷新数据
    reloadData();
  }
  oldKeyword = to.query.keyword as string;
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
