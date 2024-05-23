<template>
  <div
    class="hugs-popover-wrap"
    :class="animationClass"
    @mouseenter="handleDisplay(true)"
    @mouseleave="handleDisplay(false)"
  >
    <a class="default-entry">
      <div class="animation">
        <slot name="default"></slot>
      </div>
      <template v-if="$slots.second">
        <div class="second">
          <slot name="second"></slot>
        </div>
      </template>
    </a>
    <Transition name="hugs-popover">
      <div class="popover" v-if="display">
        <div class="popover-wrap" :class="popoverClass" :style="popoverStype">
          <slot name="popover"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  openCard?: boolean;
  position?: string; // br,bc
  distance?: string; // padding-top
  trigger?: string; //
  animation?: string; //
}>();

const display = ref(false);
const handleDisplay = (_display: boolean) => {
  // const handleDisplay = (_display: boolean, showType?: string) => {
  // if (props.showType !== showType) return
  //   if (_display) {
  display.value = _display;
  //   }
};
// 出现位置
const popoverClass = ref("");
popoverClass.value = props.position ?? "bc";
// 动画
const animationClass = ref("");
animationClass.value = props.animation ?? "";
// 触发方式

const popoverStype = {} as any;
popoverStype.paddingTop = props.distance ? props.distance + "px" : "";
</script>

<style lang="scss" scoped>
.hugs-popover-enter-active,
.hugs-popover-leave-active {
  transition: all 0.1s ease-out 0.05s;
}

.hugs-popover-enter-from,
.hugs-popover-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.hugs-popover-wrap {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 0;
  .default-entry {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    .animation {
      align-items: center;
      display: flex;
    }
    .second {
      height: 15px;
      line-height: 15px;
      font-size: 13px;
      font-weight: 400;
      font-family: inherit;
    }
  }

  .popover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    cursor: pointer;

    .popover-wrap {
      cursor: default;
      position: absolute;
    }

    .bc,
    .br {
      top: 100%;
    }

    .bc {
      left: 50%;
      transform: translateX(-50%);
    }

    .br {
      right: 0%;
    }
  }
}
// 动画
.dance {
  cursor: pointer;

  @keyframes dance {
    0% {
      transform: translateY(0);
    }

    60% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  &:hover .animation {
    animation: dance 0.25s 1 ease;
  }
}
</style>
