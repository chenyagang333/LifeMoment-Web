<template>
  <div class="AppCommentSendTip" v-if="sendIng || sendError">
    {{ sendIng ? "发送中..." : sendError ? "发送失败" : "" }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sendIng: boolean;
  sendError: boolean;
}>();
</script>

<style scoped></style>
