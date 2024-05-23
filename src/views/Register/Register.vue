<template>
  <div class="register">
    <Header></Header>
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
      <el-form-item>
        <div class="title-last">专注当下，认真生活</div>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          v-model="ruleRegisterForm.userName"
          size="large"
          placeholder="昵称"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleRegisterForm.password"
          size="large"
          show-password
          type="password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item prop="rightPassword">
        <el-input
          v-model="ruleRegisterForm.rightPassword"
          size="large"
          show-password
          type="password"
          placeholder="确认密码"
        />
      </el-form-item>
      <el-form-item prop="phoneNumber">
        <el-input
          v-model="ruleRegisterForm.phoneNumber"
          size="large"
          placeholder="手机号码"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="ruleRegisterForm.code"
          size="large"
          placeholder="短信验证码"
        >
          <template #append
            ><CountDown
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

const router = useRouter();

const ruleRegisterFormRef = ref<FormInstance>();
interface RuleForm {
  userName: string; // 用户名 昵称
  password: string; // 密码
  rightPassword: string; // 确认密码
  phoneNumber: string; // 手机号
  phoneNumberRegion: string; // 手机号所属区域
  code: string; // 手机验证码
}
const ruleRegisterForm = reactive<RuleForm>({
  userName: "",
  password: "",
  rightPassword: "",
  phoneNumber: "",
  phoneNumberRegion: "",
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
  await formEl.validateField(["phoneNumber"], (callback) => {
    if (callback) {
      SendCodeByRegister(ruleRegisterForm.phoneNumber);
      func();
    }
  });
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
  phoneNumber: [
    { min: 11, max: 11, message: "手机号码位数有误", trigger: "change" },
    {
      required: true,
      message: "手机号不能为空",
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
@import "@/styles/views/Register.scss";
</style>
