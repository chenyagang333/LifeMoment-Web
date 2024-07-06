<template>
  <div class="SearchWeUser">
    <el-card shadow="hover" v-for="i in SearchUserData">
      <AppCardUser ellipsis :userId="i.id" :data="i"></AppCardUser>
    </el-card>
    <template v-if="!loadEnd">
      <el-card id="SearchWeUserLoadDoc" shadow="hover">
        <AppCardUserTemplate></AppCardUserTemplate>
      </el-card>
      <el-card shadow="hover" v-for="i in 3">
        <AppCardUserTemplate></AppCardUserTemplate>
      </el-card>
    </template>
    <AppEmpty
      v-if="loadEnd && SearchUserData.length == 0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import AppCardUser from "@/components-App/AppCard/AppCardUser.vue";
import { get } from "@/api/AHttp/api";
import { useRoute } from "vue-router";
import { UserData } from "@/stores/user/user";
import AppCardUserTemplate from "@/components-App/AppCard/AppCardUserTemplate.vue";
import AppEmpty from "@/components-App/AppEmpty/AppEmpty.vue";

const route = useRoute();

const loadDataRef = ref();

const SearchUserData = ref<UserData[]>([]);
const loading = ref<boolean>(false);
const loadEnd = ref<boolean>(false);
let pageIndex = 1;
const getUserData = async (_pageIndex: number) => {
  loading.value = true;
  const params = {
    sort: "radioValue.value",
    keyword: route.query.keyword,
    pageSize: 10,
    pageIndex: _pageIndex,
  };
  const res = await get("Search/SearchUsers", params);
  if (res.code == 200) {
    SearchUserData.value.push(...res.data);
    if (res.data.length < 10) {
      loadEnd.value = true;
      unobserve();
    }
  }
  loading.value = false;
};

const load = () => {
  if (loadEnd.value || loading.value) return;
  getUserData(pageIndex);
  pageIndex++;
};

const ob = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      load();
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

onMounted(() => {
  load();
  const doc = document.getElementById("SearchWeUserLoadDoc");
  if (doc) {
    ob.observe(doc);
  }
});
const unobserve = () => {
  const doc = document.getElementById("SearchWeUserLoadDoc");
  if (doc) {
    ob.unobserve(doc);
  }
};
onUnmounted(() => {
  unobserve();
});
</script>

<style scoped lang="scss">
.SearchWeUser {
  width: 100%;
  // min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .el-card {
    background-color: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color);
    height: 156px;
    // 媒介查询
    @include respond-to("phone") {
      width: 100%;
    }
    @include respond-to("pad") {
      width: 100%;
    }
    @include respond-to("notebook") {
      width: 100%;
    }
    @include respond-to("desktop") {
      width: 100%;
    }
    @include respond-to("tv") {
      width: calc(50% - 5px);
    }
  }
}
</style>
