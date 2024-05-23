<template>
  <div class="header">
    <div class="content">
      <div class="left">
        <SignBox logoUrl="@/../public/chat2.svg" "> 注册</SignBox>
      </div>
      <div class="right">
        <!-- 语言切换 -->
        <hugsPopoverWrap distance="15" class="language">
          <span>简体中文</span>
          <template #popover>
            <div class="card">
              <div class="option">
                <span>Englist</span>
              </div>
            </div>
          </template>
        </hugsPopoverWrap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignBox from "@/components/SignBox.vue";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
.header {
  z-index: 1000;
  width: 100%;
  transition: background 0.4s ease-out;
  position: fixed;
  top: 0;
  left: 0;
  height: 40px;
  .content {
    width: 100%;
    $content-height: 60px;
    height: $content-height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // 页面导航
    .left {
      display: flex;
      align-items: center;
      margin-left: 30px;
    }
    // 顶部右侧选项
    .right {
      display: flex;
      align-items: center;
      margin-right: 30px;
      > div {
        // 统一样式
        margin: 0 15px;
        height: 32px;
        line-height: 32px;
      }
      .card {
        // 统一样式
        border: 1px solid rgba(236, 236, 236);
        border-radius: 10px;
        box-shadow: 0 0 5px rgb(240, 240, 240);
        background-color: rgb(255, 255, 255);
      }
      // 未登录选项

      .language {
        .up-down-option {
          span {
            font-size: 15px;
          }
        }
        .card {
          border-radius: 5px;
          .option {
            color: rgb(100, 100, 100);
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
                color: pink;
              }
            }
          }
        }
      }
    }
  }
}
</style>
