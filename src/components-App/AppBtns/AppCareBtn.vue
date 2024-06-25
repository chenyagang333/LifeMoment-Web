<template>
  <button
    class="AppCareBtn"
    :class="`_${btnType}`"
    @click="updateState"
  ></button>
</template>

<script setup lang="ts">
import { ApiResult, get } from "@/api/AHttp/api";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user/user";
const UserStore = useUserStore(); // 拿到管理用户信息的仓库

const { toUserId } = defineProps<{
  toUserId: number;
}>();

// 谁也没关注对方:_00
// 我关注TA     :_10
// TA关注我     :_01
// 互关        :_11
const btnType = ref<string>("00");

const postParams = { userId: UserStore.userData?.id, toUserId };
const getState = async () => {
  const res: ApiResult<string> = await get(
    "User/GetAttentionState",
    postParams
  );
  if (res.code == 200) {
    btnType.value = res.data;
  }
};

const updateState = async () => {
  // 我没关注TA则调用添加关注接口
  if (btnType.value == "00") {
    await addAttention();
    btnType.value = "10";
  } else if (btnType.value == "01") {
    await addAttention();
    btnType.value = "11";
    // 我没关注TA则调用取消关注接口
  } else if (btnType.value == "11") {
    await cancelAttention();
    btnType.value = "01";
  } else if (btnType.value == "10") {
    await cancelAttention();
    btnType.value = "00";
  }
};

const addAttention = async () => {
  await get("User/UserAddAttention", postParams);
};
const cancelAttention = async () => {
  await get("User/UserCancelAttention", postParams);
};

onMounted(() => {
  if (UserStore.userData != null) {
    getState();
  }
});
</script>

<style scoped lang="scss">
.AppCareBtn {
  width: 100px;
  height: 32px;
  border: none;
  border-radius: var(--jinn-border-radius);
  position: relative;
  transition: all 0.3s ease-in-out;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 15px;
    transition: all 0.3s ease-in-out;
  }
}
._00,
._01 {
  background-color: var(--jinn-color3);
  &:hover {
    background-color: var(--jinn-color4);
  }
}
._00 {
  &::after {
    content: "关注";
  }
}
._01 {
  &::after {
    // color: var(--jinn-text-c2);
    content: "回关";
  }
}
._10,
._11 {
  background-color: var(--jinn-bg2);
  &:hover {
    background-color: var(--jinn-bg3);
    &::after {
      content: "取消关注";
    }
  }
  &::after {
    color: var(--jinn-text-c2);
  }
}
._10 {
  &::after {
    content: "已关注";
  }
}
._11 {
  &::after {
    content: "朋友";
  }
}
</style>
