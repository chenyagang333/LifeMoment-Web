<template>
  <div class="UserLifeMoment">
    <AppCardShow
      ref="appCardShow"
      @load-data="loadDataHandle"
      v-if="showAppCardShow"
    ></AppCardShow>
  </div>
</template>

<script setup lang="ts">
import AppCardShow from "@/components-App/AppCardShow/AppCardShow.vue";
import { get } from "@/api/AHttp/api";
import { ref } from "vue";
import { ShowType } from "@/types/Layout1/youshow/youshow";

const props = defineProps<{
  userId: number;
  type: string;
}>();

const showAppCardShow = ref<boolean>(true);

const loadDataHandle = async (
  pageIndex: number,
  query: (data: ShowType[]) => void
) => {
  let res: any;
  if (props.type == "production") {
    res = await pagingQueryByUserId(pageIndex);
  } else if (props.type == "like" || props.type == "star") {
    res = await pagingQueryByLikeOrStar(props.type, pageIndex);
  }
  if (res.code == 200) {
    query(res.data);
  }
};

const pagingQueryByUserId = async (pageIndex: number) => {
  const params = {
    userId: props.userId,
    pageSize: 10,
    pageIndex,
  };
  return await get("YouShow/PagingQueryByUserId", params);
};
const pagingQueryByLikeOrStar = async (type: string, pageIndex: number) => {
  const params = {
    userId: props.userId,
    like_or_star: type,
    pageSize: 10,
    pageIndex,
  };
  return await get("YouShow/PagingQueryByLikeOrStar", params);
};
</script>

<style scoped></style>
