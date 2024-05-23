<template>
  <div
    class="JinnSignIn"
    :class="rollingOver || rollingOverBase ? 'rollingOver' : ''"
  >
    <span class="title">
      <i class="bi bi-calendar2-check-fill"> 签到</i>
    </span>
    <div class="sign-front radius-overflow">
      <img class="beautiful-img" :src="img1" />
      <el-button @click="rollingOverBase = true">签到</el-button>
    </div>
    <div class="sign-back radius-overflow">
      <img class="beautiful-img" :src="img2" />
      <div class="tip">{{ title }}</div>
      <div class="Date">
        <div class="date">{{ date }}</div>
        <div class="year_month">{{ year_month }}</div>
      </div>
      <div class="sub-title">
        <span> </span>
        <p class="text">{{ text }}</p>
      </div>
    </div>
    <div class="sign-friend" v-if="signFriend">好友</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GetDate, GetFullYear, GetMonth } from "@/utils/Time/NowData";

defineProps<{
  title: string;
  img1: string;
  img2: string;
  text: string;
  rollingOver?: boolean;
}>();

const date = GetDate();
const year_month = GetFullYear() + "." + GetMonth();

const signFriend = ref<boolean>(false);
const rollingOverBase = ref<boolean>(false);
</script>

<style scoped lang="scss">
.JinnSignIn {
  width: 356px;
  height: 550px;
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
  .sign-back,
  .sign-front {
    width: 356px;
    height: 460px;
    perspective: 600px;
    backface-visibility: hidden;
    transition: transform 0.5s ease-in-out;
    position: absolute;
    top: 30px;
    left: 0;
    .beautiful-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .sign-front {
    border: #8f3939;
    transform: rotateY(0);
    .el-button{
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
  }
  .sign-back {
    transform: rotateY(180deg);

    .tip,
    .Date,
    .sub-title {
      position: absolute;
      color: #fff;
    }
    .tip {
      font-size: 16px;
      top: 10px;
      left: 10px;
      width: 266px;
    }
    .Date {
      top: 10px;
      right: 10px;
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
  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.rollingOver {
  .sign-front {
    transform: rotateY(-180deg);
  }
  .sign-back {
    transform: rotateY(0);
  }
}
</style>
