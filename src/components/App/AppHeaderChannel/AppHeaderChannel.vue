<template>
  <div class="AppHeaderChannel">
    <div class="left"></div>
    <div class="center">
      <a class="channel-link">推荐</a>
      <a class="channel-link">生活</a>
      <a class="channel-link">旅行</a>
      <a class="channel-link">知识</a>
      <a class="channel-link">美食</a>
      <a class="channel-link">运动</a>
      <a class="channel-link">影像</a>
      <a class="channel-link">游戏</a>
    </div>
    <div class="right radius-overflow">
        <div class="sign-in">
            <span class="now-time"></span>
            <span class="text">签到</span>
        </div>
        <div class="publish"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.AppHeaderChannel {
  padding: 20px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .left,
  .right {
    width: 300px;
    background-color: #fff;
    height: 70px;
  }
  .left {
  }
  .center {
    width: 650px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin: 0 10px;
    .channel-link {
      display: inline-block;
      box-sizing: content-box;
      border: 1px solid #f1f2f3;
      border-radius: 6px;
      background-color: #ffffff;
      color: #61666d;
      text-align: center;
      font-weight: 400;
      transition: background-color 0.3s, color 0.3s;
      height: 28px;
      line-height: 28px;
      width: 82px;
      font-size: 15px;
      cursor: pointer;
      font-style: normal;
      &:hover {
        background-color: #e3e3e3;
        color: black;
      }
    }
  }
  .right {
    .sign-in,.publish{
        height: 100%;
    }
    .sign-in{
        background-color: #e3e3e3;
        width: 30%;
    }
    .publish{
        width: 70%;
    }
  }
}
</style>
