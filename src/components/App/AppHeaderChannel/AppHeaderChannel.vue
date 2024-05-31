<template>
  <div class="AppHeaderChannel">
    <a class="channel-link" v-for="(i, index) in links" :key="index">{{ i }}</a>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// center
const links = [
  "推荐",
  "生活",
  "旅行",
  "知识",
  "美食",
  "学习",
  "影像",
  "游戏",
  "健康",
  "工作",
];
</script>

<style scoped lang="scss">
.AppHeaderChannel {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  // margin: 0 10px;
  margin-bottom: 10px;
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
</style>
