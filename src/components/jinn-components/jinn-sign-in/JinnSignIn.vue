<template>
  <div class="JinnSignIn">
    <span class="title">
      <i class="bi bi-calendar2-check-fill"> 签到</i>
    </span>
    <JinnRolling :rollingOver="rollingOver" style="width: 100%; height: 460px">
      <template #front>
        <img class="beautiful-img" :src="img1" />
        <div class="front-top">
          <div class="Date">
            <div class="date">{{ date }}</div>
            <div class="year_month">{{ month }}月 {{ week }}</div>
          </div>
        </div>
        <div class="front-bottom">
          <el-button @click="SignIn">立即打卡</el-button>
          <span class="SignInNum">已有 {{ SignInNumBase }} 人打卡</span>
        </div>
      </template>
      <template #back>
        <img class="beautiful-img" :src="img2" />
        <div class="back-top">
          <div class="tip">{{ title }}</div>
          <div class="Date">
            <div class="date">{{ date }}</div>
            <div class="year_month">{{ year_month }}</div>
          </div>
        </div>
        <div class="sub-title">
          <span> </span>
          <p class="text">{{ text }}</p>
        </div>
      </template>
    </JinnRolling>
    <slot name="friend" v-if="$slots.friend"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GetDate, GetFullYear, GetMonth, GetWeek } from "@/utils/Time/NowDate";
import JinnRolling from "@/components/jinn-animation/jinn-rolling/JinnRolling.vue";

const props = defineProps<{
  title: string;
  img1: string;
  img2: string;
  text: string;
  SignInNum: number;
}>();

const rollingOver = defineModel("rollingOver", {
  required: true,
  default: false,
});

const emit = defineEmits<{
  (e: "SignIn"): void;
}>();

const SignIn = () => {
  rollingOver.value = true
  emit('SignIn')
}

const newDate = new Date();
const date = GetDate(newDate);
const year_month = GetFullYear(newDate) + "." + GetMonth(newDate);

const SignInNumBase = props.SignInNum.toString().replace(
  /\B(?=(\d{3})+(?!\d))/g,
  ","
);

const month = newDate.getMonth() + 1;
const week = GetWeek(newDate);
</script>

<style scoped lang="scss">
.JinnSignIn {
  display: flex;
  flex-direction: column;
  position: relative;
  .title {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #616161;
    position: relative;
    margin-bottom: 10px;
  }
  .beautiful-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  // 正面和反面除背景图外所有的内容设置定位
  .back-top,
  .front-top,
  .front-bottom,
  .sub-title {
    position: absolute;
  }
  .front-top {
    top: 0;
    padding: 10px;
    width: 100%;
    .Date {
      //   width: 70px;
      //   height: 90px;
      color: #fff;
      display: flex;
      flex-direction: column;
      padding: 30px 0 0 10px;
      .date {
        font-size: 70px;
        font-weight: 550;
        height: 70px;
        line-height: 70px;
      }
      .year_month {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .front-bottom {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    .el-button {
      height: 40px;
      font-size: 16px;
      width: 100%;
    }
    .SignInNum {
      font-size: 14px;
      color: #ffffff;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .back-top,
  .sub-title {
    color: #fff;
  }
  .back-top {
    padding: 10px;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    .tip {
      font-size: 16px;
      width: calc(100% - 90px);
    }
    .Date {
      width: 70px;
      height: 90px;
      border: 1.5px solid #fff;
      .date,
      .year_month {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .date {
        width: 100%;
        height: 70%;
        border-bottom: 1.5px solid #fff;
        font-size: 40px;
      }
    }
  }
  .sub-title {
    bottom: 0;
    left: 0;
    padding: 15px 10px;
    background-color: rgb(0, 0, 0, 0.3);
    color: #fff;
    margin-top: 26px;
    width: 100%;
    text-align: left;
    font-size: 16px;
    .text {
      text-indent: 2em;
      margin-bottom: 0;
    }
  }
}
</style>
