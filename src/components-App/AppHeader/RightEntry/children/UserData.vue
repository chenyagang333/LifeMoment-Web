<template>
  <hugs-popover-wrap distance="15" class="user-data">
    <el-avatar
      :size="40"
      :src="FileIP + userData?.userAvatar"
      @click="goUserPage(router, userData?.id!)"
    ></el-avatar>
    <template #popover>
      <div class="card-user card">
        <div class="header">
          <el-avatar
            :size="50"
            :src="FileIP + userData?.userAvatar"
            @click="goUserPage(router, userData?.id!)"
          ></el-avatar>
          <div class="info">
            <div class="top">
              <span @click="goUserPage(router, userData?.id!)">{{
                userData?.userName
              }}</span>
            </div>
            <el-space class="bottom" :size="5" spacer="|">
              <span>关注 {{ userData?.attentionCount }}</span>
              <span>粉丝 {{ userData?.fansCount }}</span>
            </el-space>
          </div>
        </div>
        <div class="options">
          <JinnButton @click="goUserPage(router, userData?.id!,'like')">
            <div class="left"><i class="bi bi-heart-fill"></i> 我的喜欢</div>
            <div class="right">
              {{ userData?.likeCount }}
              <el-icon><ArrowRightBold /></el-icon>
            </div>
          </JinnButton>
          <JinnButton @click="goUserPage(router, userData?.id!,'star')">
            <div class="left"><i class="bi bi-star-fill"></i> 我的收藏</div>
            <div class="right">
              {{ userData?.starCount }}
              <el-icon><ArrowRightBold /></el-icon>
            </div>
          </JinnButton>
          <JinnButton @click="goUserPage(router, userData?.id!,'production')">
            <div class="left">
              <i class="bi bi-file-earmark-richtext"></i> 我的动态
            </div>
            <div class="right">
              {{ userData?.contentCount }}
              <el-icon><ArrowRightBold /></el-icon>
            </div>
          </JinnButton>
        </div>
        <div class="bottom">
          <div class="left" @click="logout">
            <i class="bi bi-box-arrow-right"></i>{{ $t(lang + "userCard4") }}
          </div>
          <div class="right"></div>
        </div>
      </div>
    </template>
  </hugs-popover-wrap>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/user";
import { removeToken } from "@/utils/token";
import JinnButton from "@/components/jinn-components/jinn-button/JinnButton.vue";
import { useRouter } from "vue-router";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";
import { goUserPage } from "@/views/Layout1/user/user";

//#region 语言管理
const lang = "Layout1."; // 基本参数管理

const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;
const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量
const router = useRouter();

// 退出登录
const logout = () => {
  // UserStore.logOut()
  removeToken();
  userData.value = null;
};
</script>

<style scoped lang="scss">
.card-user {
  width: 256px;
  padding: 15px;

  background-color: var(--jinn-color1);
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    .el-avatar {
      cursor: pointer;
    }
    .info {
      display: flex;
      flex-direction: column;
      width: calc(100% - 65px);
      font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
      .top {
        font-size: 15px;
        color: var(--jinn-text-color1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        > span {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .bottom {
        font-size: 13px;
        color: var(--jinn-text-color1);
      }
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    border-bottom: 1px solid var(--el-border-color);
    > div {
      width: 100%;
      height: 39px;
      background-color: var(--jinn-bg3);
      margin-bottom: 10px;
      border-radius: var(--el-border-radius-base);
      cursor: pointer;
      color: var(--jinn-text-color1);
      margin-bottom: 10px;

      font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
      &:hover {
        background-color: var(--jinn-bg5);
      }
      .left,
      .right {
        display: flex;
        align-items: center;
      }
    }
    .bi-heart-fill {
      color: red;
    }
    .bi-star-fill {
      color: orange;
    }
    .bi-file-earmark-richtext {
      color: skyblue;
    }
  }
  .options > div,
  > .bottom {
    padding: 0 10px;
    font-size: 14.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bi {
      margin-right: 5px;
    }
  }
  > .bottom {
    margin-top: 10px;
    color: var(--jinn-text-color2);
    .left {
      cursor: pointer;
      &:hover {
        color: var(--jinn-text-color1);
      }
    }
  }
}
</style>
