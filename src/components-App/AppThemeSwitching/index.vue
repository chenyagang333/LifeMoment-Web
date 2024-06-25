<template>
  <!-- 主题切换 -->
  <div class="theme">
    <el-switch
      v-model="themeSwitch"
      @change="updateTheme"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
    />
  </div>
</template>

<script setup lang="ts">
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useAppStore } from "@/stores/app/app";
import useTheme, { LOCAL_THEME_KEY } from "@/hooks/useTheme";
import { ref } from "vue";

const { changeTheme } = useAppStore(); // app

const { theme } = useTheme();
const themeMap: any = { dark: true, light: false };
const updateTheme = (val: boolean | string | number) => {
  const value = val ? "dark" : "light";
  theme.value = value;
  changeTheme(value);
};
const key: string | null = localStorage.getItem(LOCAL_THEME_KEY);
const themeSwitch = ref<boolean>(key ? themeMap[key] : false);

//#region 路由管理
</script>

<style scoped>
.theme {
  display: flex;
  align-items: center;
}
.el-switch {
  --el-switch-off-color: rgb(255, 162, 55);
  --el-switch-on-color: rgb(130, 126, 254);
  --el-switch-border-color: rgb(255, 255, 255);
}
</style>
