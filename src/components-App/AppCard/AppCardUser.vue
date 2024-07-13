<template>
  <div class="AppCardUser">
    <AppCardUserTemplate v-if="loadingShowData"></AppCardUserTemplate>
    <JinnCardUser
      v-else
      :ellipsis="ellipsis"
      :avatarSrc="FileIP + showData.userAvatar"
      :userName="showData.userName"
      :content="showData.description ?? '此用户没有填写简介'"
      :AttentionCount="showData.attentionCount"
      :FansCount="showData.fansCount"
      :GetLikeCount="showData.getLikeCount"
      @handler="goUserPage(router,userId)"
    >
    </JinnCardUser>
    <div class="options">
      <AppCareBtn :to-user-id="userId"></AppCareBtn>
      <el-button plain>发消息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ApiResult, get } from "@/api/AHttp/api";
import AppCareBtn from "@/components-App/AppBtns/AppCareBtn.vue";
import JinnCardUser from "@/components/jinn-components/JinnCardUser/JinnCardUser.vue";
import { UserData } from "@/stores/user/user";
import AppCardUserTemplate from "./AppCardUserTemplate.vue";
import { onMounted, ref, getCurrentInstance, onBeforeMount } from "vue";
import { goUserPage } from "@/views/Layout1/user/user";
import { useRouter } from "vue-router";
const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;

const props = defineProps<{
  userId: number;
  ellipsis?: boolean;
  data?: UserData;
}>();

const router = useRouter();

const showData = ref<UserData>({} as UserData);
const loadingShowData = ref<boolean>(true);

const getUserDataByUserId = async (userId: number) => {
  const res: ApiResult<UserData> = await get("User/GetUserDataById", {
    userId,
  });
  if (res.code == 200) {
    showData.value = res.data;
  }
};

const loadData = async () => {
  if (props.data) {
    showData.value = props.data;
  } else {
    await getUserDataByUserId(props.userId);
  }
  loadingShowData.value = false;
};

onMounted(async () => {
  await loadData(); // 数据加载后在执行回调
});
</script>

<style scoped lang="scss">
.AppCardUser {
  .options {
    margin: 10px 0 5px 60px;
    display: flex;
    align-items: center;
    gap: 10px;
    .el-button {
      width: 98px;
    }
  }
}
</style>
