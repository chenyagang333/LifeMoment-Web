<template>
  <div class="RightEntry" :class="headerUp ? 'RightEntryUp' : 'RightEntryDown'">
    <!-- 用户登录 信息 -->
    <!-- 未登录 -->
    <hugs-popover-wrap
      v-if="!userData"
      distance="15"
      :openCard="!userData && !route.query.open_login_dialog"
      class="login"
      animation="dance"
    >
      <span class="login-text right-entry" @click="goLogin()">{{
        $t(lang + "loginBtn")
      }}</span>
      <template #popover>
        <div class="no-user card">
          <div class="lable">
            {{ $t(lang + "loginCardTitle") }}
          </div>
          <div class="items">
            <div class="item">
              <i class="bi bi-card-text">&nbsp;</i>
              <span>{{ $t(lang + "loginCard1") }}</span>
            </div>
            <div class="item">
              <i class="bi bi-envelope">&nbsp;</i>
              <span>{{ $t(lang + "loginCard2") }}</span>
            </div>
            <div class="item">
              <i class="bi bi-stars">&nbsp;</i>
              <span>{{ $t(lang + "loginCard3") }}</span>
            </div>
            <div class="item">
              <i class="bi bi-send">&nbsp;</i>
              <span>{{ $t(lang + "loginCard4") }}</span>
            </div>
          </div>
          <div class="btn" @click="goLogin()">
            {{ $t(lang + "loginCard5") }}
          </div>
          <div class="bottom">
            {{ $t(lang + "loginCard6") }}
            <span @click="goRegister()">{{ $t(lang + "loginCard7") }}</span>
          </div>
        </div>
      </template>
    </hugs-popover-wrap>
    <!-- 用户登录 信息 -->
    <!-- 已登录 -->
    <hugs-popover-wrap distance="15" class="user-data" v-else>
      <el-avatar :size="40" :src="userData?.avatarImageURL"></el-avatar>
      <template #popover>
        <div class="card-user card">
          <div class="header">
            <el-avatar
              :size="90"
              :src="userData?.avatarImageURL"
              shape="square"
            ></el-avatar>
            <span class="name">{{ userData?.userName }}</span>
          </div>
          <div class="options">
            <el-button size="large" type="success">{{
              $t(lang + "userCard1")
            }}</el-button>
            <el-button size="large" type="danger">{{
              $t(lang + "userCard2")
            }}</el-button>
            <el-button size="large" type="primary">{{
              $t(lang + "userCard3")
            }}</el-button>
            <el-button size="large" color="#626aef" dark @click="logout">{{
              $t(lang + "userCard4")
            }}</el-button>
          </div>
        </div>
      </template>
    </hugs-popover-wrap>
    <!-- 用户消息 -->
    <hugs-popover-wrap distance="15" class="message" animation="dance">
      <i class="bi bi-envelope right-entry"></i>
      <template #second>消息</template>
      <template #popover>
        <!-- 已登录 -->
        <div class="have-user card" v-if="userData">
          <div class="option">
            {{ $t(lang + "userMsgCard1") }}
          </div>
          <div class="option">{{ $t(lang + "userMsgCard2") }}</div>
          <div class="option">
            {{ $t(lang + "userMsgCard3") }}
          </div>
          <div class="option">
            {{ $t(lang + "userMsgCard4") }}
          </div>
          <div class="option">
            {{ $t(lang + "userMsgCard5") }}
          </div>
        </div>
        <!-- 未登录 -->
        <div class="no-user card" v-else>
          <div class="lab">
            {{ $t(lang + "loginMsgCard1") }}
          </div>
          <div class="btn" @click="goLogin()">
            {{ $t(lang + "loginCard5") }}
          </div>
        </div>
      </template>
    </hugs-popover-wrap>
    <!-- 语言切换 -->
    <hugs-popover-wrap distance="15" class="language" animation="dance">
      <div style="height: 28.5px; line-height: 28.5px">
        <i class="bi bi-translate"></i>
        <i class="bi bi-chevron-down"></i>
        <!-- <img class=bi-chevron-down src="@/assets/svgs/chevron-down.svg" /> -->
      </div>
      <template #second>语言</template>
      <template #popover>
        <div class="card">
          <div class="option" @click="changeLanguage">
            <span>{{ $t(lang + "language1") }}</span>
          </div>
        </div>
      </template>
    </hugs-popover-wrap>
    <!-- 主题切换 -->
    <div class="theme">
      <el-switch
        v-model="themeSwitch"
        @change="changeTheme"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
      />
    </div>
    <!-- 用户登录注册弹窗 -->
    <LoginDialog
      v-model="visibleLogin"
      :userAccount="userAccount as string"
    ></LoginDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { Moon, Sunny } from "@element-plus/icons-vue";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
import { storeToRefs } from "pinia";
import { removeToken } from "@/utils/token.ts";
import { ElMessage } from "element-plus";
import LoginDialog from "@/views/LoginDialog.vue";
import useTheme, { LOCAL_THEME_KEY } from "@/utils/Composables/useTheme";

defineProps<{
  headerUp: boolean;
}>();

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const { theme } = useTheme();
const themeMap: any = { dark: true, light: false };
const changeTheme = (val: boolean | string | number) => {
  if (val) theme.value = "dark";
  else theme.value = "light";
};
const key: string | null = localStorage.getItem(LOCAL_THEME_KEY);
const themeSwitch = ref<boolean>(key ? themeMap[key] : false);

//#region 路由管理

const route = useRoute();
const router = useRouter();

//#endregion

//#region 语言管理
const lang = "Layout1."; // 基本参数管理
// 切换语言
const changeLanguage = () => {
  ElMessage("英文版本开发中，敬请期待！");
  return;
  let fullPath;
  if (route.params.language == "en-us") {
    fullPath = route.fullPath.replace("en-us", "zh-cn");
  } else {
    fullPath = route.fullPath.replace("zh-cn", "en-us");
  }
  console.log("fu :>> ", route);
  window.open(router.resolve({ path: fullPath }).href, "_blank");
};
//#endregion

//#region header

//#region right

// 退出登录
const logout = () => {
  // UserStore.logOut()
  removeToken();
  userData.value = null;
};
//#endregion

//#endregion

//#region 登陆注册弹窗
const visibleLogin = ref(route.query.open_login_dialog && !userData.value); // 登录注册弹窗显示控制
const userAccount = ref(route.query.account);

const goLogin = () => {
  // 切换login
  visibleLogin.value = true;
};
const goRegister = () => {
  // 切换注册
  window.open(router.resolve({ path: "register" }).href, "_blank");
};

const userRegister = () => {};
//#endregion
</script>

<style scoped lang="scss">
// 顶部右侧选项
.RightEntry {
  display: flex;
  align-items: center;
  margin-right: 65px;
  > div {
    // 统一样式
    padding: 0 11px;
    height: 50px;
    // align-items:  flex-end;
    .bi {
      // height: 30px;
    }
  }
  .card {
    // 统一样式
    border: 1px solid var(--el-border-color-light);
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
  }
  // 未登录选项
  .login {
    .login-text {
      font-size: 14px;
      user-select: none;
      border-radius: 4px;
      padding: 5px 10px;
      display: block;
    }
    .no-user {
      width: 366px;
      padding: 15px 26px;
      user-select: none;
      color: black;
      .lable {
        font-size: 15px;
      }
      .items {
        padding: 0 5px;
        font-size: 14.5px;
        display: grid;
        grid-template-columns: repeat(2, 50%);
        .item {
          height: 40px;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          > .bi {
            color: pink;
            font-size: 20px;
          }
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: pink;
        border-radius: 7px;
        margin: 10px 0;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
        transition: background-color 0.3s;
        &:hover {
          background-color: rgb(255, 206, 213);
        }
      }
      .bottom {
        font-size: 14px;
        text-align: center;
        height: 30px;
        > span {
          color: rgb(73, 136, 255);
          cursor: pointer;
        }
      }
    }
  }
  // 已登录 用户信息
  .user-data {
    .card-user {
      width: 400px;
      padding: 30px;
      background-color: #ffffff;
      // background: radial-gradient(circle, #fff, #ffa237);
      // background: linear-gradient(135deg, #fff, #ffe5c8);
      .header {
        display: flex;
        align-items: center;
        .name {
          color: #919191;
          font-size: 20px;
          width: 230px;
          margin-left: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          transition: all 0.2s;
          &:hover {
            color: rgb(0, 0, 0);
            text-decoration: underline;
          }
        }
      }
      .options {
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 10px;
        .el-button {
          width: 100%;
          margin: 0;
          font-size: 15px;
        }
        // color: #fff200;
      }
    }
  }
  // 用户通知
  .message {
    font-size: 19px;
    // 未登录
    .no-user {
      width: 366px;
      padding: 15px 26px;
      color: black;
      user-select: none;
      font-size: 15px;
      .lab {
        color: rgb(100, 100, 100);
        text-align: center;
      }
      .btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: pink;
        border-radius: 7px;
        margin: 10px 0;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
        transition: background-color 0.3s;
        &:hover {
          background-color: rgb(255, 206, 213);
        }
      }
    }
    // 已登陆
    .have-user {
      width: 140px;
      padding: 10px 0;
      .option {
        padding: 0 15px;
        height: 35px;
        font-size: 15px;
        color: #919191;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background-color: #e1e1e1;
        }
      }
    }
  }
  .language {
    .card {
      .option {
        color: rgb(100, 100, 100);
        text-align: center;
        height: 35px;
        line-height: 35px;
        width: 100px;
        user-select: none;
        > span {
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
          &:hover {
            color: pink;
          }
        }
      }
    }
  }
  .theme {
    display: flex;
    align-items: center;
  }
}
.RightEntryUp {
  > div {
    color: #ffffff;
  }
  .login-text {
    border: 1.5px solid rgb(255, 255, 255);
  }
}
.RightEntryDown {
  .login-text {
    border: 1.5px solid rgb(0, 0, 0);
  }
}
.el-switch {
  // --el-switch-off-color: rgb(130, 126, 254);
  --el-switch-off-color: rgb(255, 162, 55);
  --el-switch-on-color: rgb(130, 126, 254);
  --el-switch-border-color: rgb(255, 255, 255);
}
</style>
