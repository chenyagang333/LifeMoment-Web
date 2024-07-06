<template>
  <div class="RelevantSearchList">
    <div class="options">
      <h2>相关搜索</h2>
      <el-scrollbar max-height="400px">
        <JinnButton
          type="lucency"
          v-for="(i, index) in data"
          :key="index"
          @click="goSearch(i.relevanSearchWord)"
        >
          <i class="bi bi-search"></i>
          {{ i.relevanSearchWord }}
        </JinnButton>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import JinnButton from "@/components/jinn-components/jinn-button/JinnButton.vue";
import { get } from "@/api/AHttp/api";

const route = useRoute();
const router = useRouter();

const data = ref<any[]>([]);

const GetRelevantSearch = async () => {
  const res = await get("Search/GetRelevantSearch", {
    keyword: route.query.keyword,
  });
  if (res.code == 200) {
    data.value = res.data;
  }
};

const goSearch = (keyword: string) => {
  router.push({
    path: route.path,
    query: {
      keyword,
    },
  });
};

onMounted(() => {
  GetRelevantSearch();
});
</script>

<style scoped lang="scss">
.RelevantSearchList {
  position: sticky;
  width: 260px;
  top: 0;
  @include mobile{
    display: none;
  }
  .options {
    width: 100%;
    padding: 10px;
    position: sticky;
    top: 74px;
    background-color: var(--el-bg-color-overlay);
    transition: all 0.3s ease-in-out;
    border-radius: var(--el-border-radius-base);
    border: 1px solid var(--el-border-color);
    > h2 {
      color: var(--el-text-color-primary);
      font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
      font-weight: 500;
      line-height: 26px;
      font-size: 19px;
      margin-bottom: 10px;
    }
    .JinnButton {
      font-size: 16px;
      color: var(--el-text-color-regular);
      gap: 10px;
    }
  }
}
</style>
