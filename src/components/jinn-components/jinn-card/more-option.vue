<template>
  <a-dropdown position="br">
    <div class="more-options">
      <i class="bi bi-chevron-down"></i>
    </div>
    <template #content>
       <a-doption v-if="userId == userData?.userId" @click="deleteMyShow">
          删除</a-doption>
        <a-doption v-else>举报</a-doption>
    </template>
</a-dropdown>
</template>

<script setup lang="ts">
import { del } from "@/api/AHttp/api";
import { useUserStore } from "@/stores/user/user";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import hugsPopoverWrap from "@/components/hugs-popover-wrap/hugs-popover-wrap.vue";


const UserStore = useUserStore(); // 拿到管理用户信息的仓库
const { userData } = storeToRefs(UserStore); // 响应式的结构变量

const props = defineProps<{
  userId: number;
  showId: number;
}>();

const emit = defineEmits<{
  (e: "deleteMyShow"): void;
}>();

const deleteMyShow = async () => {
  const res = await del("YouShow/DeleteById", { id: props.showId });
  if (res.code == 200) {
    ElMessage.success({
      offset: 300,
      message: "删除成功成功！",
      showClose: true,
    });
    emit("deleteMyShow"); // 删除成功触发动画
  }
};
</script>

<style lang="scss" scoped>
.more-options {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 26px;
  height: 26px;
  line-height: 28px;
  text-align: center;
  font-size: 15px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 130, 0, 0.1);
    color: #ff8200;
  }
}
</style>
