<template>
  <div class="JinnCardUser">
    <div class="left">
      <el-avatar :size="50" :src="avatarSrc" @click="$emit('handler')" />
    </div>
    <div class="right">
      <div class="info">
        <div class="top ellipsis">
          <span @click="$emit('handler')">{{ userName }}</span>
        </div>
        <el-space class="bottom" :size="10" spacer="|">
          <span>关注 {{ AttentionCount }}</span>
          <span>粉丝 {{ FansCount }}</span>
          <span>获赞 {{ GetLikeCount }}</span>
        </el-space>
      </div>
      <JinnDescription v-if="ellipsis" :content="content"></JinnDescription>
      <span class="BriefIntroduction" v-else>{{ content }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import JinnDescription from "@/components/jinn-components/jinn-text/jinn-description/JinnDescription.vue";

const props = defineProps<{
  avatarSrc: string;
  userName: string;
  ellipsis?: boolean; // 简介超出一行变成省略号
  content?: string;
  AttentionCount: number;
  FansCount: number;
  GetLikeCount: number;
}>();

const emit = defineEmits<{
  (e: "handler"): void;
}>();


onMounted(() => {
  // configShowMoreContent();
});
</script>

<style scoped lang="scss">
.JinnCardUser {
  display: flex;
  justify-content: space-between;
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > .left {
    .el-avatar {
      cursor: pointer;
    }
  }
  > .right {
    width: calc(100% - 60px);
    font-family: PingFang SC, DFPKingGothicGB-Regular, sans-serif;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      padding: 3px 0;
      .top {
        font-size: 15px;
        color: var(--jinn-text-color1);

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
    .BriefIntroduction {
      font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue,
        Microsoft YaHei, sans-serif;
      padding-right: 20px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: var(--jinn-text-color2);
    }
  }
}
</style>
