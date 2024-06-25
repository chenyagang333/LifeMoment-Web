<template>
  <div class="register">
    <!-- <Header></Header> -->
    <el-form
      ref="ruleRegisterFormRef"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
      :rules="rules"
      :model="ruleRegisterForm"
      size="default"
    >
      <el-form-item>
        <div class="title">欢迎注册</div>
      </el-form-item>
      <el-form-item prop="userName" label="昵称">
        <el-input
          v-model="ruleRegisterForm.userName"
          size="large"
          placeholder="昵称"
        />
      </el-form-item>
      <el-form-item prop="mail" label="邮箱">
        <el-input
          v-model="ruleRegisterForm.mail"
          size="large"
          placeholder="邮箱"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="ruleRegisterForm.password"
          size="large"
          show-password
          type="password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item prop="rightPassword" label="确认密码">
        <el-input
          v-model="ruleRegisterForm.rightPassword"
          size="large"
          show-password
          type="password"
          placeholder="确认密码"
        />
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input
          v-model="ruleRegisterForm.code"
          size="large"
          placeholder="短信验证码"
        >
          <template #append
            ><CountDown
              style="margin: 0 -20px; padding: 0 20px"
              :time="2"
              @send-code="(func:any) => sendCodeByRegister(func,ruleRegisterFormRef)"
            ></CountDown
          ></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          :loading="loadingRegisterBtn"
          @click="submitRegisterForm(ruleRegisterFormRef)"
          >立即注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Header from "./Header.vue";
import CountDown from "@/components/CountDown.vue";
import { CreateUser, SendCodeByRegister } from "@/api/Register";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { validateEmail } from "@/utils/FormValidation/RegExpHelper";

const router = useRouter();

const ruleRegisterFormRef = ref<FormInstance>();
interface RuleForm {
  userName: string; // 用户名 昵称
  password: string; // 密码
  rightPassword: string; // 确认密码
  mail: string; // 邮箱
  code: string; // 手机验证码
}
const ruleRegisterForm = reactive<RuleForm>({
  userName: "",
  password: "",
  rightPassword: "",
  mail: "",
  code: "",
});

// 获取手机验证码
const sendCodeByRegister = async (
  func: any,
  formEl: FormInstance | undefined
) => {
  console.log("object :>> ", formEl);
  if (!formEl) return;
  // (props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback | undefined) => FormValidationResult
  await formEl.validateField(["mail"], async (callback) => {
    if (callback) {
      func();
      const res = await SendCodeByRegister(ruleRegisterForm.mail);
      if (res.code !== 200) {
        func();
        ElMessage.error(res.message);
      }
    }
  });
};

const validateMail = (rule: any, value: any, callback: any) => {
  if (validateEmail(ruleRegisterForm.mail)) {
    callback();
  } else {
    callback(new Error("邮箱格式有误！"));
  }
};

const rules = reactive<FormRules<RuleForm>>({
  userName: [
    {
      required: true,
      message: "昵称不可以为空",
      trigger: "change",
    },
    { min: 1, max: 11, message: "昵称长度为8-16个字符", trigger: "change" },
  ],
  password: [
    {
      required: true,
      message: "密码不可以为空",
      trigger: "change",
    },
    { min: 8, max: 16, message: "密码长度为8-16个字符", trigger: "change" },
  ],
  rightPassword: [
    {
      required: true,
      message: "确认密码不可以为空",
      trigger: "change",
    },
    { min: 8, max: 16, message: "密码长度为8-16个字符", trigger: "change" },
  ],
  mail: [
    { validator: validateMail, message: "邮箱格式有误！", trigger: "change" },
    {
      required: true,
      message: "邮箱不能为空",
      trigger: "change",
    },
  ],
  code: [
    { min: 6, max: 6, message: "验证码位数有误", trigger: "blur" },
    {
      required: true,
      message: "验证码不能为空",
      trigger: "change",
    },
    // {
    //   type:'number',
    //   message: "验证码必须是数字",
    //   trigger: "change",
    // },
  ],
});

const loadingRegisterBtn = ref(false);
const submitRegisterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loadingRegisterBtn.value = true;
      const res = await CreateUser(ruleRegisterForm);
      loadingRegisterBtn.value = false;
      if (res.code == 200) {
        router.push({ path: "registersucceed", query: { account: res.data } });
      } else {
        ElMessage.error(res.message);
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.register {
  // background-image: url("@/assets/home-top-0.jpg");
  // background-size: cover;
  // width: 100vw;
  // height: 100vh;
  background-color: var(--jinn-bg4);
  display: flex;
  align-items: center;
  height: calc(100vh - 305px);
  min-height: 483px;
  .el-form {
    margin: 0 auto;
    width: 500px;
    .el-form-item {
      .title {
        font-size: 40px;
        //  text-shadow: #FC0 1px 0 1px;
        font-weight: 500;
        color: var(--jinn-color5);
      }
      .el-button,
      .el-input {
        width: 320px;
        // height: 37px;
      }

      .el-input {
        width: 320px;
        // --el-input-bg-color: rgba(255, 255, 255, 0.7);
        // --el-fill-color-light: rgba(255, 255, 255, 0.85);
        .el-input-group__append {
          padding: 0 10px;
        }

        .el-input__wrapper {
          .el-input__inner {
            // background: rgba(255, 255, 255, 0);
          }
        }
      }
      .el-button {
      }
    }
  }
}
</style>
