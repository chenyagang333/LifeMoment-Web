<template>
  <div
    class="JinnRolling radius-overflow"
    :class="rollingOver || rollingOverBase ? 'rollingOver' : ''"
  >
    <div class="sign-front"><slot name="front"></slot></div>
    <div class="sign-back"><slot name="back"></slot></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  rollingOver?: boolean;
}>();

const rollingOverBase = ref<boolean>(false);

onMounted(() => {
});
</script>

<style scoped lang="scss">
.JinnRolling {
  position: relative;
  width: 356px;
  height: 460px;
  .sign-back,
  .sign-front {
    width: 100%;
    height: 100%;
    perspective: 600px;
    backface-visibility: hidden;
    transition: transform 0.6s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
  }
  .sign-front {
    border: #8f3939;
    transform: rotateY(0);
  }
  .sign-back {
    transform: rotateY(180deg);
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
