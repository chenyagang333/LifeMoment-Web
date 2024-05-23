<template>
  <div>
    <el-result icon="success">
      <template #title>
        <div class="title">注册成功</div>
      </template>
      <template #extra>
        <div class="container">
          <div class="sub-title">HUGS账号：{{ route.query.account }}</div>
        </div>
        <el-button
          type="primary"
          style="width: 230px; margin-top: 30px"
          @click="login"
          >登录</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const login = () => {
  router.push({
    path: "/",
    query: { open_login_dialog: 1, account: route.query.account },
  });
};
</script>

<style scoped>
.title {
  font-size: 2rem;
}
.sub-title {
  font-size: 1.2rem;
  text-align: center;
  color: rgb(130, 130, 130);
}
</style>
