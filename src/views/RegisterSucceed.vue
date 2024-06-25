<template>
  <div class="RegisterSucceed">
    <el-result icon="success">
      <template #title>
        <div class="title">注册成功</div>
      </template>
      <template #extra>
        <div class="container">
          <div class="sub-title">您的WS账号为：{{ route.query.account }}</div>
        </div>
        <el-button
          type="primary"
          style="width: 230px; margin-top: 30px"
          @click="login"
          >去登录</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { removeToken } from "@/utils/token";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
const UserStore = useUserStore(); // 拿到管理用户信息的仓库

const route = useRoute();
const router = useRouter();

const login = () => {
  removeToken();
  UserStore.userData = null;
  router.push({
    path: "/",
    query: { open_login_dialog: 1, account: route.query.account },
  });
};
</script>

<style scoped>
.RegisterSucceed {
  height: 660px;
  background-color: var(--jinn-bg4);
  .title {
    font-size: 2rem;
  }
  .sub-title {
    font-size: 1.2rem;
    text-align: center;
    color: rgb(130, 130, 130);
  }
}
</style>
