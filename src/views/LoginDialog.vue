<template>
  <div class="login">
    <!-- 用户登录注册弹窗 -->
    <div class="main">
      <!-- Data -->
      <div class="left">
        <el-avatar :size="210" :src="headerImg"></el-avatar>
        <div class="user-name">chenyaagng</div>
      </div>
      <div class="right">
        <q-tabs v-model="activeName" dense align="justify">
          <q-tab class="text-blue" name="passwordLogin" label="密码登录">
          </q-tab>
          <q-tab class="text-orange" name="smsLogin" label="短信登陆" />
        </q-tabs>
        <q-tab-panels v-model="activeName" animated>
          <q-tab-panel name="passwordLogin">
            <div class="text-h6">
              <div class="right-main">
                <el-input
                  v-model="userName"
                  size="large"
                  clearable
                  :placeholder="$t(lang + 'accountTip')"
                >
                  <template #prefix>
                    <span class="text">{{ $t(lang + "account") }}&nbsp;</span>
                  </template> </el-input
                ><br />
                <el-input
                  v-model="password"
                  size="large"
                  :placeholder="$t(lang + 'passwordTip')"
                  type="password"
                  show-password
                >
                  <template #prefix>
                    <span class="text">{{ $t(lang + "password") }}&nbsp;</span>
                  </template> </el-input
                ><br />
                <el-button size="large" @click="goRegister()">{{
                  $t(lang + "register")
                }}</el-button>
                <el-button
                  size="large"
                  :loading="loginLoading"
                  type="primary"
                  @click="userLogin"
                >
                  登录
                </el-button>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="smsLogin">
            <div class="text-h6">
              <div class="right-main right-main-smsLogin">
                <el-input
                  v-model="phoneNumber"
                  size="large"
                  clearable
                  placeholder="请输入手机号"
                >
                  <template #prefix>
                    <span class="text">手机号&nbsp;</span>
                  </template>
                  <template #append
                    ><CountDown
                      :time="2"
                      @send-code="(func:any) => sendCode(func)"
                    ></CountDown
                  ></template> </el-input
                ><br />
                <el-input
                  v-model="code"
                  size="large"
                  placeholder="请输入验证码"
                >
                  <template #prefix>
                    <span class="text">验证码&nbsp;</span>
                  </template> </el-input
                ><br />
                <el-button
                  color="#ff9800 "
                  size="large"
                  type="primary"
                  plain
                  :loading="loginLoading"
                  @click="userLoginBySMS"
                >
                  登录/注册
                </el-button>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <div class="dialog-footer">
      <!-- {{ $t(lang + "footerTip") }} -->
      <template v-if="activeName == 'passwordLogin'">
        如果您还没有HUGS账号，请先
        <el-link type="primary" @click="goRegister">注册账号</el-link>
      </template>
      <template v-else> 未注册过HUGS的手机号，我们将帮你自动注册账号 </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import headerImg from "@/assets/defaultHead.png";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
import { setToken } from "@/utils/token.ts";
import CountDown from "@/components/CountDown.vue";
import { Login, LoginByPhoneSMS, SendCodeBySMSLogin } from "@/api/LoginDialog";
import {
  checkInputs,
  checkInputPhone,
  checkInputPassword,
  checkInputCode,
} from "@/utils/FormValidation/FormValidation";
import { ElMessage, ElNotification } from "element-plus";

const emit = defineEmits<{
  (e: "CloseDialog"): void;
}>();

const props = defineProps<{
  userAccount?: string;
}>();

//#region 路由管理

const route = useRoute();
const router = useRouter();

//#endregion

const lang = "Layout1."; // 基本参数管理

const UserStore = useUserStore(); // 拿到管理用户信息的仓库

//#region 登陆注册弹窗

const activeName = ref("passwordLogin");
const loginLoading = ref(false);

const goRegister = () => {
  // 切换注册
  window.open(router.resolve({ path: "register" }).href, "_blank");
};

//#region 密码登录
const userName = ref(props.userAccount ?? "100000");
const password = ref("cyg304625");
const userLogin = async () => {
  if (!loginLoading.value) {
    const callback = checkInputs([checkInputPassword(password.value)]);
    if (!callback) return;
    // 用户登录
    loginLoading.value = true;
    const res = await Login(userName.value, password.value);
    if (res.code == 200) {
      await LoginSuccessFunc(res.data);
    } else {
      ElMessage.error(res.message);
    }
    loginLoading.value = false;
  }
};

//#endregion

//#region 短信登陆

const phoneNumber = ref("");
const code = ref("");

const userLoginBySMS = async () => {
  if (!loginLoading.value) {
    const callback = checkInputs([
      checkInputPhone(phoneNumber.value),
      checkInputCode(code.value),
    ]);
    if (!callback) return;
    loginLoading.value = true;
    const res = await LoginByPhoneSMS(phoneNumber.value, code.value);
    if (res.code == 200) {
      await LoginSuccessFunc(res.data);
    } else {
      ElMessage.error(res.message);
    }
    loginLoading.value = false;
  }
};

const sendCode = async (func: any) => {
  const callback = checkInputs([checkInputPhone(phoneNumber.value)]);
  if (!callback) return;
  const res = await SendCodeBySMSLogin(phoneNumber.value);
  if (res.code == 200) {
    func();
  }
};

//#endregion

const LoginSuccessFunc = async (token: string) => {
  setToken(token);
  await UserStore.getUserData();
  emit("CloseDialog"); // 登陆成功 关闭弹窗
  ElNotification({
    title: "登陆成功！",
    message: "欢迎回来。",
    type: "success",
  });
};

const userRegister = () => {};
//#endregion
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 26%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    .el-avatar {
      border: 2px solid #919191;
    }
    .user-name {
      height: 50px;
      line-height: 50px;
    }
  }
  .right {
    text-align: center;
    width: 70%;
    margin-right: 10px;
    border: 1px solid var(--el-border-color);
    .lable {
      height: 45px;
      line-height: 45px;
      background-color: #f5f7fa;
      border-bottom: 1px solid var(--el-border-color);
      font-size: 16px;
    }
    .q-tab-panel {
      padding: 0;
      .right-main {
        padding: 15px;
        .el-input {
          margin-bottom: 15px;
        }
        .text {
          color: black;
          font-size: 15px;
        }
        .get-code {
          cursor: pointer;
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .el-button {
          width: 48.5%;
          font-size: 15px;
          cursor: pointer;
        }
      }
      .right-main-smsLogin {
        .el-input {
          --el-input-focus-border-color: orange;
        }
      }
    }
  }
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14.5px;
  margin-top: 20px;
  color: #919191;
  .el-link {
    font-size: 14.5px;
  }
}
</style>
