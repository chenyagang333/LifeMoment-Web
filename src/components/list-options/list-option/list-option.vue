<template>
  <div class="list-option">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.list-option {
  padding: 0 15px;
  height: 35px;
  line-height: 35px;
  width: 80px;
  text-align: center;
  font-size: 14.5px;
  color: black;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #edeff6;
  }
}
</style>
