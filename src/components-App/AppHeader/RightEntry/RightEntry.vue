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
    <UserData v-else></UserData>
    <!-- 用户消息 -->
    <hugs-popover-wrap distance="15" class="message" animation="dance">
      <i class="bi bi-envelope right-entry"></i>
      <template #second> <div style="width: 26px">消息</div></template>
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
      <div style="height: 28.5px; line-height: 28.5px; width: 32px">
        <i class="bi bi-translate"></i>
        <i class="bi bi-chevron-down"></i>
        <!-- <img class=bi-chevron-down src="@/assets/svgs/chevron-down.svg" /> -->
      </div>
      <template #second><div style="width: 26px">语言</div></template>
      <template #popover>
        <div class="card">
          <div class="option" @click="changeLanguage">
            <span>{{ $t(lang + "language1") }}</span>
          </div>
        </div>
      </template>
    </hugs-popover-wrap>
    <!-- 主题切换 -->
    <AppThemeSwitching></AppThemeSwitching>
  </div>
  <!-- 用户登录注册弹窗 -->
  <!-- <a-modal
    width="850px"
    :footer="false"
    hide-title
    v-model:visible="appStore.showLoginDialog"
  >
  </a-modal> -->
  <el-dialog
    v-model="appStore.showLoginDialog"
    title="Shipping address"
    width="850"
    :show-close="false"
    top="30vh"
    destroy-on-close
  >
    <template #header>
      <div></div>
    </template>
    <LoginDialog
      style="margin: -40px 0 -10px 0"
      :userAccount="userAccount"
      @CloseDialog="() => (appStore.showLoginDialog = false)"
    ></LoginDialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Moon, Sunny } from "@element-plus/icons-vue";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/user";
import { useAppStore } from "@/stores/app/app";
import { ElMessage } from "element-plus";
import LoginDialog from "@/views/LoginDialog.vue";
import UserData from "./children/UserData.vue";
import AppThemeSwitching from "@/components-App/AppThemeSwitching/index.vue";

defineProps<{
  headerUp: boolean;
}>();

const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const appStore = useAppStore(); // app
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

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
};
//#endregion

//#region header

//#region right

//#endregion

//#endregion

//#region 登陆注册弹窗
if (route.query.open_login_dialog && !userData.value) {
  appStore.showLoginDialog = true;
}
const userAccount = ref<string>(route.query.account as string);

const goLogin = () => {
  // 切换login
  appStore.showLoginDialog = true;
};
const goRegister = () => {
  // 切换注册
  window.open(router.resolve({ path: "register" }).href, "_blank");
};

const userRegister = () => {};
//#endregion

// 已登录用户
const goUserPage = () => {};
</script>

<style scoped lang="scss">
// 顶部右侧选项
.RightEntry {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 30px;
  @include mobile {
    display: none;
  }
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
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    background-color: var(--jinn-color1);
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
      color: var(--jinn-text-color1);
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
            color: var(--jinn-color3);
            font-size: 20px;
          }
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: var(--jinn-color3);
        border-radius: 7px;
        margin: 10px 0;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
        transition: background-color 0.3s;
        &:hover {
          background-color: var(--jinn-color4);
        }
      }
      .bottom {
        font-size: 14px;
        text-align: center;
        height: 30px;
        > span {
          color: var(--jinn-text-color1);
          cursor: pointer;
        }
      }
    }
  }
  // 已登录 用户信息
  .user-data {
    .el-avatar {
      background-image: url("@/assets/default/defaultAvatar.png");
      background-size: cover;
    }
  }
  // 用户通知
  .message {
    font-size: 19px;
    // 未登录
    .no-user {
      width: 306px;
      padding: 15px 26px;
      color: --jinn-text-color1;
      user-select: none;
      font-size: 15px;
      .lab {
        color: var(--jinn-text-color1);
        text-align: center;
      }
      .btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: var(--jinn-color3);
        border-radius: 7px;
        margin: 10px 0;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
        transition: background-color 0.3s;
        &:hover {
          background-color: var(--jinn-color4);
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
        line-height: 35px;
        font-size: 15px;
        color: var(--jinn-text-color1);
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background-color: var(--jinn-bg2);
        }
      }
    }
  }
  .language {
    .card {
      .option {
        color: var(--jinn-text-color1);
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
            color: var(--jinn-color3);
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
  > div {
    color: var(--jinn-text-color1);
  }
  .login-text {
    border: 1.5px solid var(--jinn-text-color1);
  }
}

</style>
