<template>
  <div class="sign">
    <div class="btn" :style="{ color: color }">
      <img v-if="logoSrc" class="logo-img" :src="logoSrc" alt="MyChat" />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logoSrc?: string;
  color?: string;
}>();
</script>

<style lang="scss" scoped>
.sign {
  $content-height: 60px;
  $sign-color: rgb(255, 191, 71);
  font-size: 30px;
  line-height: $content-height;
  color: white;
  cursor: pointer;
  transition: color 0.3s, background-color 1s ease-out;
  padding: 0 15px;
  position: relative;
  box-sizing: border-box;
  user-select: none;

  &:hover {
    color: $sign-color;
    background-color: rgb(255, 191, 71, 0.1);
    text-shadow: 0 0 px $sign-color;
  }
  &:active {
    transition: color 0.3s, background-color 0.3s;
    background-color: rgb(255, 191, 71, 0.3);
    color: rgb(255, 184, 53);
  }
  &::after,
  &::before {
    box-sizing: inherit;
    position: absolute;
    content: "";
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }
  &::after {
    top: 0;
    left: 0;
  }
  &::before {
    bottom: 0;
    right: 0;
  }
  &:hover::after,
  &:hover::before {
    width: 100%;
    height: 100%;
  }
  &:hover::after {
    border-top-color: $sign-color;
    border-right-color: $sign-color;
    transition: width 0.1s ease-out, height 0.1s ease-out 0.1s;
  }
  &:hover::before {
    border-bottom-color: $sign-color;
    border-left-color: $sign-color;
    transition: border-color 0s ease-out 0.2s, width 0.1s ease-out 0.2s,
      height 0.1s ease-out 0.3s;
  }

  > .btn {
    display: flex;
    align-items: center;
    > img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
