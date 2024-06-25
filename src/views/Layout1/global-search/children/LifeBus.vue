<template>
  <div class="SearchLifeBus">
    <div class="SearchWeStrength-header">
      <a-tabs
        v-model:active-key="radioValue"
        @change="changeTabs"
        type="card-gutter"
        auto-switch
      >
        <a-tab-pane key="default" title="综合排序"> </a-tab-pane>
        <a-tab-pane key="MostLikes" title="最多喜欢"> </a-tab-pane>
        <a-tab-pane key="MostComments" title="最多评论"> </a-tab-pane>
        <a-tab-pane key="NewPublish" title="最新发布"> </a-tab-pane>
        <a-tab-pane key="MostStars" title="最多收藏"> </a-tab-pane>
        <a-tab-pane key="MostViews" title="最多浏览"> </a-tab-pane>
      </a-tabs>
    </div>
    <div class="SearchWeStrength-Core">
      <AppCardShow
        @load-data="loadDataHandle"
        v-if="showAppCardShow"
      ></AppCardShow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppCardShow from "@/components-App/AppCard/AppCardShow.vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";
import { get } from "@/api/AHttp/api";
import { useRoute, useRouter } from "vue-router";
import { nextTick } from "vue";

const route = useRoute();
const router = useRouter();

const radioValue = ref<string>("default");

const showAppCardShow = ref<boolean>(true);

const loadDataHandle = async (
  pageIndex: number,
  query: (data: ShowType[]) => void
) => {
  const params = {
    sort: radioValue.value,
    keyword: route.query.keyword,
    pageSize: 10,
    pageIndex,
  };
  const res = await get("YouShow/SearchPagingQuery", params);
  if (res.code == 200) {
    query(res.data);
  }
};

onMounted(() => {});

const changeTabs = (key: string) => {
  reloadData();
};

const reloadData = async () => {
  showAppCardShow.value = false;
  await nextTick();
  showAppCardShow.value = true;
};
</script>

<style scoped lang="scss">
.SearchLifeBus {
  div {
    overflow: visible;
  }
  .SearchWeStrength-header {
    background-color: var(--jinn-bg4);
  }
  .SearchWeStrength-Core {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    // gap: 10px;
    // position: relative;
  }
}
</style>
